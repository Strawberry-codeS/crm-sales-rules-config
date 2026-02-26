import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Use CORS if needed, and parse JSON bodies
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

// Initialize Supabase ONLY if URL and key are provided
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

app.post('/api/sales-rules', async (req, res) => {
  try {
    const { followUpCycle, followUpTimes, firstResponseValue, firstResponseUnit } = req.body;

    console.log('Received payload:', req.body);

    // Calculate first_response_deadline_at
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
      follow_up_period_days: followUpCycle, // "后续随访期天数" / "跟进周期"
      min_follow_ups_required: followUpTimes, // "最低跟进次数要求"
      first_response_deadline_at: firstResponseDeadline, // "first_response_deadline_at"
    };

    console.log('Updating Supabase with:', updateData);

    if (supabase) {
      // NOTE: Here we update ALL existing records in the customers table.
      // This will overwrite the fields if they have values, and populate them if they are empty.
      const { data, error } = await supabase
        .from('customers')
        .update(updateData)
        // A placeholder condition to update all records. Modify the condition based on your primary key type if needed.
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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
