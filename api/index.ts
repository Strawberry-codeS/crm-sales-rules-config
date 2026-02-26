import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

app.post('/api/sales-rules', async (req, res) => {
    try {
        const { followUpCycle, followUpTimes, firstResponseValue, firstResponseUnit } = req.body;

        console.log('Received payload:', req.body);

        let multiplier = 0;
        if (firstResponseUnit === '分钟内') {
            multiplier = 60 * 1000;
        } else if (firstResponseUnit === '小时内') {
            multiplier = 60 * 60 * 1000;
        } else if (firstResponseUnit === '天内') {
            multiplier = 24 * 60 * 60 * 1000;
        }

        const durationMs = firstResponseValue * multiplier;
        if (isNaN(durationMs)) {
            return res.status(400).json({ success: false, error: 'Invalid time value or unit' });
        }

        const firstResponseDeadline = new Date(Date.now() + durationMs).toISOString();

        const updateData = {
            follow_up_period_days: followUpCycle,
            min_follow_ups_required: followUpTimes,
            first_response_deadline_at: firstResponseDeadline,
        };

        console.log('Updating Supabase with:', updateData);

        if (supabase) {
            const { data, error } = await supabase
                .from('customers')
                .update(updateData)
                .neq('id', '00000000-0000-0000-0000-000000000000');

            if (error) {
                console.error('Supabase update error:', error);
                return res.status(500).json({ success: false, error: error.message });
            }

            console.log('Successfully updated the database!');
        } else {
            console.warn('Supabase credentials missing. Logic executed but database wasn\'t updated.');
        }

        res.json({ success: true, message: 'Settings saved and data updated.', data: updateData });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

export default app;
