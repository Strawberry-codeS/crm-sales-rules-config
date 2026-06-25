/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, KeyboardEvent, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart3,
  Settings,
  ShieldCheck,
  ChevronRight,
  Search,
  RotateCcw,
  Plus,
  Download,
  ArrowLeft,
  Filter,
  Clock,
  Tag,
  Trash2,
  Edit3,
  CheckCircle2,
  Check,
  X,
  Star,
  Save,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TabType = 'monthly' | 'process' | 'aging';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('monthly');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'workbench', icon: LayoutDashboard, label: '工作台', hasSub: true },
    { id: 'leads', icon: Users, label: '线索管理' },
    { id: 'opportunities', icon: Briefcase, label: '商机管理' },
    { id: 'reports', icon: BarChart3, label: '数据报表' },
    { id: 'control', icon: ShieldCheck, label: '控制中心', active: true },
    { id: 'settings', icon: Settings, label: '系统设置' },
  ];

  const tabs = [
    { id: 'monthly', label: '销售月计划设置' },
    { id: 'process', label: '销售流程规范' },
    { id: 'aging', label: '销售时效设置' },
  ];

  return (
    <div className="flex h-screen bg-[#F4F7FA] font-sans text-[#333]">
      {/* Sidebar */}
      <aside className={`bg-[#F0EEFF] border-r border-[#E0DDF5] transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6">
          <h1 className={`text-[#4A3AFF] font-bold text-xl transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            瑞思教育CRM
          </h1>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-white text-[#4A3AFF] shadow-sm' : 'text-[#666] hover:bg-white/50'
                }`}
            >
              <item.icon size={20} className={item.active ? 'text-[#4A3AFF]' : 'text-[#999]'} />
              {isSidebarOpen && (
                <span className="ml-3 flex-1 font-medium">{item.label}</span>
              )}
              {isSidebarOpen && item.hasSub && <ChevronRight size={16} className="text-[#CCC]" />}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-[#E0DDF5]">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#4A3AFF] flex items-center justify-center text-white font-bold">
              张
            </div>
            {isSidebarOpen && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium truncate">张三老师，您好！</p>
                <p className="text-xs text-[#999] truncate">当前机构：北京广渠门校区</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-[#EEE] px-6 py-4 flex items-center">
          <button className="p-2 hover:bg-gray-100 rounded-full mr-4">
            <ArrowLeft size={20} className="text-[#666]" />
          </button>
          <div className="flex items-center text-sm text-[#999]">
            <span>控制中心</span>
            <span className="mx-2 font-mono">&gt;</span>
            <span className="text-[#333]">销售任务设置</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#EEE]">
            <h2 className="text-xl font-bold text-[#333]">销售规则配置</h2>
          </div>

          {/* Tabs Card */}
          <div className="bg-white rounded-xl shadow-sm border border-[#EEE] overflow-hidden">
            <div className="flex border-b border-[#EEE] px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-6 py-4 text-sm font-medium transition-all relative ${activeTab === tab.id ? 'text-[#4A3AFF]' : 'text-[#666] hover:text-[#333]'
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A3AFF]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'monthly' && <MonthlyPlanView key="monthly" />}
                {activeTab === 'process' && <ProcessView key="process" />}
                {activeTab === 'aging' && <AgingView key="aging" />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ========== 配置销售指标考核 Modal Types ==========
type Indicator = {
  id: string;
  name: string;
  desc: string;
  category: string;
  unit: string;
};

const ALL_INDICATORS: Indicator[] = [
  { id: 'recruit', name: '招生人数目标', desc: '高频核心班生KPI', category: '招生类', unit: '人' },
  { id: 'cash', name: '现金目标', desc: '重检头安全红练', category: '业绩类', unit: '万元' },
  { id: 'refund', name: '退费人数上限', desc: '风控预警指标', category: '常规', unit: '人' },
  { id: 'classIn', name: '进班人数', desc: '学员正式进班人数', category: '常规', unit: '人' },
  { id: 'flow', name: '引流产品签约数', desc: '体验课转化业标', category: '引流专项', unit: '单' },
  { id: 'winter', name: '零暑期课目标', desc: '季节性招生指引', category: '零暑期课专项', unit: '人' },
  { id: 'referral', name: '口碑转介绍数', desc: '转介绍亮点指标', category: '口碑专项', unit: '单' },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  '招生类': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  '业绩类': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  '常规': { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
  '引流专项': { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
  '零暑期课专项': { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200' },
  '口碑专项': { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200' },
};

function MonthlyPlanView() {
  const [showModal, setShowModal] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('2026年02月');
  const [pickerYear, setPickerYear] = useState(2026);

  // 配置指标弹窗状态
  const [configSalesperson, setConfigSalesperson] = useState('全部销售');
  const [configMonth, setConfigMonth] = useState('2026-02');
  const [selectedIndicatorIds, setSelectedIndicatorIds] = useState<string[]>(['recruit', 'cash', 'flow', 'winter', 'referral']);
  const [indicatorValues, setIndicatorValues] = useState<Record<string, string>>({
    recruit: '45', cash: '120.00', flow: '200', winter: '80', referral: '12'
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleIndicator = (id: string) => {
    if (selectedIndicatorIds.includes(id)) {
      setSelectedIndicatorIds(prev => prev.filter(i => i !== id));
    } else {
      setSelectedIndicatorIds(prev => [...prev, id]);
    }
  };

  const removeIndicator = (id: string) => {
    setSelectedIndicatorIds(prev => prev.filter(i => i !== id));
  };

  const months = [
    '01月', '02月', '03月', '04月', '05月', '06月',
    '07月', '08月', '09月', '10月', '11月', '12月'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-lg font-bold mb-2">销售月计划设置</h3>
        <p className="text-sm text-[#999]">配置销售团队的任务规则，包括任务分配、任务跟进要求、任务考核标准等，确保销售工作有序推进。</p>
      </div>

      {/* Search Bar */}
      <div className="bg-[#F9FAFB] p-6 rounded-lg border border-[#EEE] grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#666] uppercase tracking-wider">查询月份</label>
          <div className="relative">
            <input
              type="text"
              placeholder="----年--月"
              className="w-full bg-white border border-[#DDD] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF]"
            />
            <Clock size={16} className="absolute right-3 top-2.5 text-[#CCC]" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#666] uppercase tracking-wider">销售姓名</label>
          <select className="w-full bg-white border border-[#DDD] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF] appearance-none">
            <option value="">请选择销售</option>
            <option value="张三">张三</option>
            <option value="李四">李四</option>
            <option value="王五">王五</option>
          </select>
        </div>
        <div className="flex space-x-3">
          <button className="bg-[#1890FF] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#40A9FF] transition-colors flex items-center justify-center space-x-2">
            <Search size={16} />
            <span>查询</span>
          </button>
          <button className="bg-white border border-[#DDD] text-[#666] px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
            <RotateCcw size={16} />
            <span>重置</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#52C41A] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#73D13D] transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>新增月份任务</span>
        </button>
      </div>

      {/* Table */}
      <div className="border border-[#EEE] rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#F9FAFB] text-[#666] font-bold border-b border-[#EEE]">
            <tr>
              <th className="px-6 py-4">销售姓名</th>
              <th className="px-6 py-4">月份</th>
              <th className="px-6 py-4">招生人头</th>
              <th className="px-6 py-4">现金(万)</th>
              <th className="px-6 py-4">退费人数</th>
              <th className="px-6 py-4">进班人数</th>
              <th className="px-6 py-4">引流产品签约数</th>
              <th className="px-6 py-4">寒暑期课目标</th>
              <th className="px-6 py-4">口碑转介绍数</th>
              <th className="px-6 py-4">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEE]">
            {[
              { name: '张三', month: '2026年2月', target: 5, cash: 4, refund: 0, class: 3, flow: 200, winter: 80, referral: 12 },
              { name: '李四', month: '2026年2月', target: 5, cash: 4, refund: 0, class: 3, flow: 200, winter: 80, referral: 12 },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.month}</td>
                <td className="px-6 py-4">{row.target}</td>
                <td className="px-6 py-4">{row.cash}</td>
                <td className="px-6 py-4">{row.refund}</td>
                <td className="px-6 py-4">{row.class}</td>
                <td className="px-6 py-4">{row.flow}</td>
                <td className="px-6 py-4">{row.winter}</td>
                <td className="px-6 py-4">{row.referral}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setShowModal(true)}
                      className="text-[#1890FF] text-sm font-medium hover:text-[#40A9FF] transition-colors"
                    >
                      编辑
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(true)}
                      className="text-[#FF4D4F] text-sm font-medium hover:text-[#FF7875] transition-colors"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 配置销售指标考核 Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-8 py-5 border-b border-[#F0EEF8]">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#F0EEFF] rounded-lg flex items-center justify-center">
                    <Settings size={18} className="text-[#4A3AFF]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#222]">配置销售指标考核</h3>
                </div>
                <button onClick={() => setShowModal(false)} className="text-[#AAA] hover:text-[#333] transition-colors p-1 rounded-full hover:bg-gray-100">
                  <X size={20} />
                </button>
              </div>

              {/* Top Selectors */}
              <div className="grid grid-cols-2 gap-6 px-8 pt-6 pb-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#666]">执行销售人员</label>
                  <div className="relative">
                    <select
                      value={configSalesperson}
                      onChange={e => setConfigSalesperson(e.target.value)}
                      className="w-full border border-[#DDD] rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF] appearance-none"
                    >
                      <option value="全部销售">全部销售</option>
                      <option value="张三">张三</option>
                      <option value="李四">李四</option>
                      <option value="王五">王五</option>
                    </select>
                    <ChevronRight size={14} className="absolute right-3 top-3.5 rotate-90 text-[#999] pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#666]">考核目标月份</label>
                  <input
                    type="month"
                    value={configMonth}
                    onChange={e => setConfigMonth(e.target.value)}
                    className="w-full border border-[#DDD] rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF]"
                  />
                </div>
              </div>

              {/* Two-panel Body */}
              <div className="grid grid-cols-[280px_1fr] gap-0 px-8 pb-4" style={{ minHeight: 380 }}>
                {/* Left: Indicator Library */}
                <div className="pr-6 border-r border-[#F0EEF8]">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-4 h-4 bg-[#F0EEFF] rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#4A3AFF] rounded-sm" />
                    </div>
                    <span className="text-sm font-semibold text-[#333]">待选指标库</span>
                  </div>

                  {/* Group by category - basic indicators */}
                  <div className="space-y-1 mb-4">
                    {ALL_INDICATORS.filter(ind => !['引流专项', '零暑期课专项', '口碑专项'].includes(ind.category)).map(ind => (
                      <label key={ind.id} className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-[#F8F7FF] cursor-pointer transition-colors">
                        <div
                          onClick={() => toggleIndicator(ind.id)}
                          className={`mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors ${selectedIndicatorIds.includes(ind.id)
                            ? 'bg-[#4A3AFF] border-[#4A3AFF]'
                            : 'border-[#CCC] bg-white'
                            }`}
                        >
                          {selectedIndicatorIds.includes(ind.id) && <Check size={10} className="text-white" strokeWidth={3} />}
                        </div>
                        <div onClick={() => toggleIndicator(ind.id)} className="flex-1">
                          <p className="text-sm font-medium text-[#333] leading-tight">{ind.name}</p>
                          <p className="text-xs text-[#AAA] mt-0.5">{ind.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Special indicators */}
                  <div className="mb-2">
                    <p className="text-xs text-[#AAA] font-medium mb-2 pl-1">专项指标</p>
                    <div className="space-y-1">
                      {ALL_INDICATORS.filter(ind => ['引流专项', '零暑期课专项', '口碑专项'].includes(ind.category)).map(ind => {
                        const colors = CATEGORY_COLORS[ind.category];
                        return (
                          <label key={ind.id} className={`flex items-start space-x-3 p-2.5 rounded-lg border cursor-pointer transition-all ${selectedIndicatorIds.includes(ind.id)
                            ? `${colors.bg} ${colors.border} border`
                            : 'border-[#EEE] hover:border-[#D3ADFF] hover:bg-[#FAF8FF]'
                            }`}>
                            <div
                              onClick={() => toggleIndicator(ind.id)}
                              className={`mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors ${selectedIndicatorIds.includes(ind.id)
                                ? 'bg-[#4A3AFF] border-[#4A3AFF]'
                                : 'border-[#CCC] bg-white'
                                }`}
                            >
                              {selectedIndicatorIds.includes(ind.id) && <Check size={10} className="text-white" strokeWidth={3} />}
                            </div>
                            <div onClick={() => toggleIndicator(ind.id)} className="flex-1">
                              <p className={`text-sm font-semibold leading-tight ${selectedIndicatorIds.includes(ind.id) ? colors.text : 'text-[#333]'}`}>{ind.name}</p>
                              <p className="text-xs text-[#AAA] mt-0.5">{ind.desc}</p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right: Configured Indicators Detail */}
                <div className="pl-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-[#4A3AFF]" />
                      <span className="text-sm font-semibold text-[#333]">已配置指标明细</span>
                    </div>
                    <span className="text-xs text-[#AAA]">
                      已选 <span className="text-[#4A3AFF] font-bold">{selectedIndicatorIds.length}</span> 个指标
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {selectedIndicatorIds.map(id => {
                      const ind = ALL_INDICATORS.find(i => i.id === id)!;
                      const colors = CATEGORY_COLORS[ind.category] || CATEGORY_COLORS['常规'];
                      return (
                        <motion.div
                          key={id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`relative rounded-xl border-2 p-4 ${['引流专项', '零暑期课专项', '口碑专项'].includes(ind.category)
                            ? `${colors.border} bg-white`
                            : 'border-[#EEE] bg-white'
                            }`}
                        >
                          <button
                            onClick={() => removeIndicator(id)}
                            className="absolute top-3 right-3 text-[#CCC] hover:text-[#FF4D4F] transition-colors"
                          >
                            <X size={16} />
                          </button>
                          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded mb-2 ${colors.bg} ${colors.text}`}>
                            {ind.category}
                          </span>
                          <p className="text-sm font-bold text-[#222] mb-3">{ind.name}</p>
                          <div className="relative">
                            <input
                              type="number"
                              value={indicatorValues[id] || ''}
                              onChange={e => setIndicatorValues(prev => ({ ...prev, [id]: e.target.value }))}
                              placeholder="请输入目标值"
                              className="w-full border border-[#E8E8E8] rounded-lg px-3 py-2 pr-12 text-sm bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF]"
                            />
                            <span className="absolute right-3 top-2 text-xs text-[#AAA]">{ind.unit}</span>
                          </div>
                        </motion.div>
                      );
                    })}

                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-8 py-4 border-t border-[#F0EEF8] bg-[#FDFCFF]">
                <div className="flex items-center space-x-2 text-xs text-[#AAA]">
                  <CheckCircle2 size={14} className="text-[#4A3AFF]" />
                  <span>确认后指标将同步至被选销售人员的个人中心</span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 rounded-lg border border-[#DDD] text-[#666] text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 rounded-lg bg-[#4A3AFF] text-white text-sm font-medium hover:bg-[#3D2EDD] transition-colors shadow-lg shadow-[#4A3AFF]/25 flex items-center space-x-2"
                  >
                    <CheckCircle2 size={14} />
                    <span>确认并保存</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FFF1F0] flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={24} className="text-[#FF4D4F]" />
                </div>
                <h3 className="text-lg font-bold text-[#333] mb-2">是否删除</h3>
                <p className="text-sm text-[#666] mb-6">删除后该销售目标将清除</p>
                <div className="flex justify-center space-x-3">
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-6 py-2 rounded-lg border border-[#DDD] text-[#666] font-medium hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-6 py-2 rounded-lg bg-[#FF4D4F] text-white font-medium hover:bg-[#FF7875] transition-colors shadow-sm"
                  >
                    确认删除
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProcessView() {
  const [showModal, setShowModal] = useState(false);
  const [newStage, setNewStage] = useState('');
  const [newAction, setNewAction] = useState('');
  const [actions, setActions] = useState<string[]>([]);
  const [template, setTemplate] = useState('');

  const handleAddAction = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && newAction.trim()) {
      if (!actions.includes(newAction.trim())) {
        setActions([...actions, newAction.trim()]);
      }
      setNewAction('');
    }
  };

  const removeAction = (actionToRemove: string) => {
    setActions(actions.filter(a => a !== actionToRemove));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold mb-2">销售流程规范设置</h3>
          <p className="text-sm text-[#999]">为不同商机阶段配置标准动作，帮助销售团队规范跟进流程，提升转化率。</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#1890FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#40A9FF] transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>添加配置</span>
        </button>
      </div>

      <div className="space-y-6">
        {[
          {
            id: 1,
            title: '承诺上门',
            actions: ['确认时间', '发送定位', '准备资料'],
            template: ['1、确认时间', '2、参加人', '3、提醒道路和停车等']
          },
          {
            id: 2,
            title: '已上门未关单',
            actions: ['回访体验', '解答疑问', '保单沟通'],
            template: ['1、客户痛点', '2、提供的方案', '3、后续计划']
          }
        ].map((item) => (
          <div key={item.id} className="bg-[#F9FAFB] border border-[#EEE] rounded-xl p-6 relative">
            <button className="absolute top-6 right-6 bg-[#FF4D4F] text-white px-3 py-1 rounded text-xs hover:bg-[#FF7875] transition-colors">
              删除
            </button>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-6 h-6 bg-[#1890FF] text-white rounded flex items-center justify-center text-xs font-bold">
                {item.id}
              </div>
              <h4 className="font-bold text-[#333]">{item.title}</h4>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-[#666] w-24">标准动作列表：</span>
                <div className="flex flex-wrap gap-2 flex-1">
                  {item.actions.map((action, i) => (
                    <div key={i} className="bg-white border border-[#DDD] px-3 py-1 rounded flex items-center space-x-2 text-sm">
                      <span>{action}</span>
                      <X size={12} className="text-[#FF4D4F] cursor-pointer" />
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="输入新动作，按回车添加"
                    className="bg-transparent border-none text-sm focus:outline-none min-w-[200px]"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-sm text-[#666] w-24 pt-2">纪要模板：</span>
                <div className="flex-1">
                  <div className="bg-white border border-[#DDD] rounded-md p-4 min-h-[100px] text-sm text-[#666] leading-relaxed">
                    {item.template.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Process Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-[#333]">添加流程配置</h3>
                <button onClick={() => setShowModal(false)} className="text-[#999] hover:text-[#333]">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                {/* Customer Stage */}
                <div className="flex items-center">
                  <label className="w-24 text-sm font-medium text-[#666]">客户阶段</label>
                  <div className="flex-1 relative">
                    <select
                      value={newStage}
                      onChange={(e) => setNewStage(e.target.value)}
                      className="w-full border border-[#DDD] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF] appearance-none bg-white"
                    >
                      <option value="">请选择客户阶段</option>
                      <option value="未承诺">未承诺</option>
                      <option value="承诺上门">承诺上门</option>
                      <option value="承诺未上门">承诺未上门</option>
                      <option value="已定金">已定金</option>
                      <option value="已全款">已全款</option>
                    </select>
                    <ChevronRight size={16} className="absolute right-4 top-4 rotate-90 text-[#999] pointer-events-none" />
                  </div>
                </div>

                {/* Standard Actions */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <label className="w-24 text-sm font-medium text-[#666]">标准动作</label>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newAction}
                        onChange={(e) => setNewAction(e.target.value)}
                        onKeyDown={handleAddAction}
                        placeholder="输入动作名称，按回车添加"
                        className="w-full border border-[#DDD] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF]"
                      />
                      <Plus size={18} className="absolute right-4 top-3.5 text-[#999] cursor-pointer" onClick={() => {
                        if (newAction.trim()) {
                          setActions([...actions, newAction.trim()]);
                          setNewAction('');
                        }
                      }} />
                    </div>
                  </div>
                  {actions.length > 0 && (
                    <div className="pl-24 flex flex-wrap gap-2">
                      {actions.map((action, index) => (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          key={index}
                          className="bg-[#F0EEFF] text-[#722ED1] border border-[#D3ADFF] px-3 py-1.5 rounded-full flex items-center space-x-2 text-xs font-medium"
                        >
                          <span>{action}</span>
                          <X size={14} className="cursor-pointer hover:text-[#FF4D4F]" onClick={() => removeAction(action)} />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Summary Template */}
                <div className="flex items-start">
                  <label className="w-24 text-sm font-medium text-[#666] pt-3">纪要模板</label>
                  <textarea
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    placeholder="请输入该阶段跟进后的纪要模板内容..."
                    className="flex-1 border border-[#DDD] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF] h-32 resize-none leading-relaxed"
                  />
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-8 py-3 rounded-lg border border-[#DDD] text-[#666] font-medium hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-8 py-3 rounded-lg bg-[#4A3AFF] text-white font-medium hover:bg-[#3D2EDD] transition-colors shadow-lg shadow-[#4A3AFF]/20"
                  >
                    确认添加
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function AgingView() {
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [followUpTimes, setFollowUpTimes] = useState(1);
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>(['call']);
  const [filters, setFilters] = useState([{ id: 1, field: '客户等级', operator: '等于', value: 'A类客户', logic: '且' }]);
  const [filterLogicMode, setFilterLogicMode] = useState<'any' | 'all' | 'group'>('any');
  const [showTimeoutWarn, setShowTimeoutWarn] = useState(false);
  const [showAutoRemind, setShowAutoRemind] = useState(false);
  const [selectedRemindDays, setSelectedRemindDays] = useState<number[]>([3, 4]);
  const [remindTime, setRemindTime] = useState('01:28 AM');
  const [recyclingDays, setRecyclingDays] = useState(3);
  const [followUpCycle, setFollowUpCycle] = useState(3);
  const [validationError, setValidationError] = useState('');
  const [reminderValue, setReminderValue] = useState(0);
  const [reminderUnit, setReminderUnit] = useState('小时前');

  const [firstResponseValue, setFirstResponseValue] = useState(30);
  const [firstResponseUnit, setFirstResponseUnit] = useState('分钟内');
  const [isSaving, setIsSaving] = useState(false);
  const [timePeriods, setTimePeriods] = useState<{ id: number, days: string[], startTime: string, endTime: string }[]>([
    { id: 1, days: ['周三', '周四', '周五'], startTime: '2:24 PM', endTime: '2:24 PM' }
  ]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showRecycleRulesModal, setShowRecycleRulesModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [orderTypeTab, setOrderTypeTab] = useState('全部');
  const [filterOrderType, setFilterOrderType] = useState('全部');
  const [filterChannel1, setFilterChannel1] = useState('全部');
  const [filterChannel2, setFilterChannel2] = useState('全部');
  const [filterChannel3, setFilterChannel3] = useState('全部');
  const [showRecycleFilter, setShowRecycleFilter] = useState(false);
  const [filterBranch, setFilterBranch] = useState('北京分公司');
  const [filterCampus, setFilterCampus] = useState('全部');

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const ALL_DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/sales-rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followUpCycle,
          followUpTimes,
          firstResponseValue,
          firstResponseUnit
        }),
      });

      const data = await response.json();
      if (data.success) {
        setShowModal(false);
      } else {
        alert('保存失败：' + (data.error || '未知错误'));
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('保存失败，请检查网络或后端服务');
    } finally {
      setIsSaving(false);
    }
  };

  const validateReminder = (value: number, unit: string) => {
    let days = value;
    if (unit === '小时前') days = value / 24;
    if (unit === '分钟前') days = value / (24 * 60);

    if (days > recyclingDays) {
      setValidationError(`提醒时间不能超过客群回收天数 (${recyclingDays}天)`);
    } else {
      setValidationError('');
    }
  };

  useEffect(() => {
    validateReminder(reminderValue, reminderUnit);
  }, [reminderValue, reminderUnit, recyclingDays]);

  const behaviors = [
    { id: 'call', label: '通话记录 (呼出且接通)', icon: Clock },
    { id: 'summary', label: '咨询纪要更新', icon: Edit3 },
  ];

  const toggleBehavior = (id: string) => {
    if (selectedBehaviors.includes(id)) {
      setSelectedBehaviors(selectedBehaviors.filter(b => b !== id));
    } else {
      setSelectedBehaviors([...selectedBehaviors, id]);
    }
  };

  const addFilter = () => {
    setFilters([...filters, { id: Date.now(), field: '客户等级', operator: '等于', value: 'B类客户', logic: '且' }]);
  };

  const removeFilter = (id: number) => {
    if (filters.length > 1) {
      setFilters(filters.filter(f => f.id !== id));
    }
  };

  const updateFilterLogic = (id: number, logic: string) => {
    setFilters(filters.map(f => f.id === id ? { ...f, logic } : f));
  };

  const getOrdinal = (n: number) => {
    const s = ["首次", "二次", "三次", "四次", "五次", "六次", "七次", "八次", "九次", "十次"];
    return s[n - 1] || `${n}次`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold mb-2">销售时效设置</h3>
          <p className="text-sm text-[#999]">配置各时段和阶段的跟进时效规则，超时自动在工作台提醒，确保重要商机不被遗漏，支持按类和权限对不同规则设置。</p>
        </div>
        <button
          onClick={() => {
            setModalMode('create');
            setModalStep(1);
            setShowModal(true);
          }}
          className="bg-[#1890FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#40A9FF] transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>添加配置</span>
        </button>
      </div>

      <div className="space-y-6">
        {[
          {
            title: 'A类客户3天内跟进',
            status: '启用',
            desc: '描述：A类客户3天内最少有一次跟进记录，以咨询纪要为准',
            details: [
              '适用分公司：北京分公司',
              '适用校区：北京广渠门校区、北京西直门校区',
              '适用渠道：全部',
              '跟进周期：3天',
              '跟进次数：1次',
              '适用客群：'
            ]
          },
          {
            title: '新单分配后拨打3次',
            status: '启用',
            desc: '描述：新单分配后，1天内未打通必须有3次拨打记录，以咨询纪要为准',
            details: [
              '适用分公司：上海分公司',
              '适用校区：全部',
              '适用渠道：线上营销',
              '跟进周期：1天',
              '跟进次数：3次',
              '适用客群：'
            ]
          }
        ].map((rule, i) => (
          <div key={i} className="bg-white border border-[#EEE] rounded-xl p-6 shadow-sm relative border-l-4 border-l-[#722ED1]">
            <div className="absolute top-6 right-6 flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked readOnly className="w-4 h-4 text-[#1890FF] rounded border-gray-300 focus:ring-[#1890FF]" />
                <span className="text-sm text-[#666]">已启用</span>
              </label>
              <button 
                onClick={() => {
                  setModalMode('edit');
                  setShowModal(true);
                }}
                className="text-[#666] hover:text-[#333] text-sm flex items-center space-x-1"
              >
                <Edit3 size={14} />
                <span>编辑</span>
              </button>
              <button className="text-[#FF4D4F] hover:text-[#FF7875] text-sm flex items-center space-x-1">
                <Trash2 size={14} />
                <span>删除</span>
              </button>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-[#F0EEFF] text-[#722ED1] rounded-lg">
                <Settings size={20} />
              </div>
              <h4 className="font-bold text-[#333]">{rule.title}</h4>
              <span className="bg-[#E6FFFB] text-[#08979C] text-[10px] px-2 py-0.5 rounded border border-[#B5F5EC]">
                {rule.status}
              </span>
            </div>

            <p className="text-sm text-[#999] mb-4">{rule.desc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
              {rule.details.map((detail, j) => {
                const [label, ...rest] = detail.split('：');
                const value = rest.join('：');
                
                return (
                  <div key={j} className="flex items-center text-sm text-[#333]">
                    <span className="font-medium min-w-[80px]">{label}：</span>
                    {label === '适用客群' ? (
                      <div className="flex items-center text-[#666] space-x-2">
                        <span>自定义客群</span>
                        <button 
                          onClick={() => setShowAudienceModal(true)}
                          className="text-[#1890FF] hover:text-[#40A9FF] transition-colors p-1 flex items-center justify-center rounded-full hover:bg-[#E6F7FF]"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    ) : label === '跟进次数' ? (
                      <div className="flex items-center text-[#666] space-x-2">
                        <span>{value}</span>
                        <button 
                          onClick={() => setShowFollowUpModal(true)}
                          className="text-[#1890FF] hover:text-[#40A9FF] transition-colors p-1 flex items-center justify-center rounded-full hover:bg-[#E6F7FF]"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[#666]">{value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Multi-step Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-white rounded-2xl shadow-2xl w-full transition-all duration-300 ${modalStep === 1 ? 'max-w-2xl' : 'max-w-4xl'}`}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-[#333]">
                  {modalMode === 'edit' ? '编辑规则' : (modalStep === 1 ? '创建新的规则' : '配置规则详情')}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-[#999] hover:text-[#333]">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {(modalMode === 'edit' || modalStep === 1) && (
                  <div className={modalMode === 'edit' ? "bg-[#F9FAFB] rounded-2xl p-6 border border-[#EEE] space-y-6" : "space-y-8"}>
                    {modalMode === 'edit' && (
                      <h4 className="font-bold text-[#333] flex items-center space-x-2 mb-6">
                        <div className="w-1 h-4 bg-[#722ED1] rounded-full"></div>
                        <span>基本信息</span>
                      </h4>
                    )}
                    <div className="flex items-center">
                    <label className="w-24 text-sm font-medium text-[#666]">记录类型</label>
                    <div className="flex-1 relative">
                      <select className="w-full border border-[#DDD] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF] appearance-none">
                        <option>商机</option>
                      </select>
                      <ChevronRight size={16} className="absolute right-4 top-4 rotate-90 text-[#999]" />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="w-24 text-sm font-medium text-[#666]">规则名</label>
                    <input
                      type="text"
                      placeholder="B类客户5天内跟进"
                      className="flex-1 border border-[#DDD] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF]"
                    />
                  </div>

                  <div className="flex items-start">
                    <label className="w-24 text-sm font-medium text-[#666] pt-3">描述</label>
                    <textarea
                      placeholder="B类客户5天内最少一次跟进，以咨询纪要保存为准"
                      className="flex-1 border border-[#DDD] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF] h-24 resize-none"
                    />
                  </div>

                  {modalMode === 'create' && (
                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-8 py-3 rounded-lg border border-[#DDD] text-[#666] font-medium hover:bg-gray-50 transition-colors"
                      >
                        取消
                      </button>
                      <button
                        onClick={() => setModalStep(2)}
                        className="px-8 py-3 rounded-lg bg-[#4A3AFF] text-white font-medium hover:bg-[#3D2EDD] transition-colors"
                      >
                        下一步
                      </button>
                    </div>
                  )}
                </div>
                )}

                {(modalMode === 'edit' || modalStep === 2) && (
                  <div className={modalMode === 'edit' ? "bg-[#F9FAFB] rounded-2xl p-6 border border-[#EEE] space-y-8" : "space-y-8"}>
                    {modalMode === 'edit' && (
                      <h4 className="font-bold text-[#333] flex items-center space-x-2 mb-6">
                        <div className="w-1 h-4 bg-[#722ED1] rounded-full"></div>
                        <span>规则配置</span>
                      </h4>
                    )}
                    {/* Scope Selection */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium text-[#666] w-20">适用分公司</label>
                      <select 
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="flex-1 border border-[#DDD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20"
                      >
                        <option value="">请选择分公司</option>
                        <option value="总部">总部</option>
                        <option value="全部直营">全部直营</option>
                        <option value="全部合作">全部合作</option>
                        <option value="北京分公司">北京分公司</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium text-[#666] w-20">适用校区</label>
                      <select 
                        value={selectedCampus}
                        onChange={(e) => setSelectedCampus(e.target.value)}
                        className="flex-1 border border-[#DDD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20"
                      >
                        <option value="">请选择校区</option>
                        <option value="bj_gq">北京广渠门校区</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-[#666] w-20">适用渠道</label>
                    <div className="flex-1 flex space-x-3">
                      <select 
                        value={selectedChannel}
                        onChange={(e) => setSelectedChannel(e.target.value)}
                        className="flex-1 border border-[#DDD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20"
                      >
                        <option value="">请选择渠道</option>
                        <option value="all">全部渠道</option>
                        <option value="online">线上营销</option>
                      </select>
                      <select className="flex-1 border border-[#DDD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20">
                        <option>网络新媒体</option>
                      </select>
                      <select className="flex-1 border border-[#DDD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20">
                        <option>引流产品</option>
                      </select>
                    </div>
                  </div>

                  {/* Recycle Rules Button */}
                  <AnimatePresence>
                    {selectedBranch && selectedChannel && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center space-x-4 overflow-hidden pt-2"
                      >
                        <label className="text-sm font-medium text-[#666] w-20">回收时间</label>
                        <button 
                          onClick={() => setShowRecycleRulesModal(true)}
                          className="flex-1 bg-[#F9FAFB] border border-[#DDD] rounded-lg px-4 py-3 text-sm text-[#666] text-left hover:border-[#4A3AFF] hover:text-[#4A3AFF] transition-colors flex justify-between items-center"
                        >
                          <span>点击查看当前分公司/渠道关联回收规则</span>
                          <ChevronRight size={16} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Phased Follow-up Deadline */}
                  <div className="bg-[#F9FAFB] rounded-2xl p-6 border border-[#EEE] space-y-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-[#E6F7FF] text-[#1890FF] rounded-lg">
                          <Clock size={18} />
                        </div>
                        <h4 className="font-bold text-[#333]">阶段性跟进时限</h4>
                      </div>
                      <span className="bg-[#E6F7FF] text-[#1890FF] text-[10px] font-bold px-2 py-1 rounded border border-[#91D5FF] uppercase tracking-wider">Dynamic Logic</span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border border-[#DDD]">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-[#666]">跟进周期</span>
                          <input
                            type="number"
                            value={followUpCycle}
                            onChange={(e) => setFollowUpCycle(Number(e.target.value))}
                            className="w-16 border border-[#DDD] rounded-lg px-2 py-1 text-center text-sm font-bold focus:ring-2 focus:ring-[#4A3AFF]/20"
                          />
                          <span className="text-sm text-[#666]">天内</span>
                        </div>
                        <div className="w-[1px] h-6 bg-[#EEE]"></div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-[#666]">最少跟进</span>
                          <input
                            type="number"
                            value={followUpTimes}
                            onChange={(e) => setFollowUpTimes(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                            className="w-16 border border-[#DDD] rounded-lg px-2 py-1 text-center text-sm font-bold text-[#722ED1] focus:ring-2 focus:ring-[#4A3AFF]/20"
                          />
                          <span className="text-sm text-[#666]">次</span>
                        </div>
                      </div>

                      {followUpCycle > recyclingDays && (
                        <p className="text-[10px] text-[#FF4D4F] font-bold flex items-center space-x-1">
                          <span>⚠️ 跟进周期不能大于客群回收天数</span>
                        </p>
                      )}


                    </div>

                    {/* Follow-up Time Limit Detail - Dynamic */}
                    <div className="space-y-4 pt-2 border-t border-[#EEE]">
                      <h5 className="text-xs font-bold text-[#999] uppercase tracking-widest">跟进时限配置</h5>
                      <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: followUpTimes }).map((_, i) => (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={i}
                            className="space-y-2 bg-white p-3 rounded-xl border border-[#DDD]"
                          >
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] font-bold text-[#666]">{getOrdinal(i + 1)}跟进时限</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              {i === 0 ? (
                                <>
                                  <input
                                    type="number"
                                    value={firstResponseValue}
                                    onChange={(e) => setFirstResponseValue(Number(e.target.value))}
                                    className="w-full border border-[#DDD] rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#4A3AFF]"
                                  />
                                  <select
                                    value={firstResponseUnit}
                                    onChange={(e) => setFirstResponseUnit(e.target.value)}
                                    className="bg-transparent text-xs text-[#999] border-none focus:ring-0 p-0"
                                  >
                                    <option>分钟内</option>
                                    <option>小时内</option>
                                    <option>天内</option>
                                  </select>
                                </>
                              ) : (
                                <>
                                  <input type="text" placeholder="24" className="w-full border border-[#DDD] rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#4A3AFF]" />
                                  <select className="bg-transparent text-xs text-[#999] border-none focus:ring-0 p-0">
                                    <option>小时内</option>
                                    <option>天内</option>
                                    <option>分钟内</option>
                                  </select>
                                </>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>


                  </div>

                  {/* Reminders */}
                  <div className="space-y-6 border-t border-[#EEE] pt-6">
                    {/* Auto Remind */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="auto-remind"
                          className="w-4 h-4 text-[#722ED1] rounded border-gray-300 cursor-pointer focus:ring-[#722ED1]"
                          checked={showAutoRemind}
                          onChange={(e) => setShowAutoRemind(e.target.checked)}
                        />
                        <label htmlFor="auto-remind" className="text-sm font-bold text-[#333] cursor-pointer">启用自动提醒</label>
                      </div>

                      <AnimatePresence>
                        {showAutoRemind && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-7 space-y-6 overflow-hidden"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#666]">超时后提醒日期</span>
                                <span className="text-[10px] text-[#999]">选定天数内无跟进触发提醒（无咨询纪要）</span>
                              </div>
                              <div className="grid grid-cols-4 gap-3">
                                {[1, 2, 3, 4, 5, 7, 10, 14].map((day) => (
                                  <div
                                    key={day}
                                    onClick={() => {
                                      if (selectedRemindDays.includes(day)) {
                                        setSelectedRemindDays(selectedRemindDays.filter(d => d !== day));
                                      } else {
                                        setSelectedRemindDays([...selectedRemindDays, day]);
                                      }
                                    }}
                                    className={`flex items-center space-x-2 p-2 rounded border cursor-pointer transition-all ${selectedRemindDays.includes(day)
                                      ? 'bg-[#F0EEFF] border-[#722ED1]'
                                      : 'bg-white border-[#DDD] hover:border-[#722ED1]/30'
                                      }`}
                                  >
                                    <div className={`w-3 h-3 rounded border flex items-center justify-center ${selectedRemindDays.includes(day) ? 'bg-[#722ED1] border-[#722ED1]' : 'border-[#DDD]'
                                      }`}>
                                      {selectedRemindDays.includes(day) && <Check size={8} className="text-white" />}
                                    </div>
                                    <span className={`text-xs ${selectedRemindDays.includes(day) ? 'text-[#722ED1] font-bold' : 'text-[#666]'}`}>第{day}天</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-bold text-[#666]">提醒时间</label>
                              <div className="relative w-40">
                                <input
                                  type="text"
                                  value={remindTime}
                                  onChange={(e) => setRemindTime(e.target.value)}
                                  className="w-full border border-[#DDD] rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-[#722ED1] outline-none"
                                />
                                <Clock size={16} className="absolute right-3 top-2.5 text-[#999]" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>


                  </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      {modalMode === 'create' ? (
                        <button
                          onClick={() => setModalStep(1)}
                          className="px-8 py-3 rounded-lg border border-[#DDD] text-[#666] font-medium hover:bg-gray-50 transition-colors"
                        >
                          上一步
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowModal(false)}
                          className="px-8 py-3 rounded-lg border border-[#DDD] text-[#666] font-medium hover:bg-gray-50 transition-colors"
                        >
                          取消
                        </button>
                      )}
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-8 py-3 rounded-lg bg-[#4A3AFF] text-white font-medium hover:bg-[#3D2EDD] transition-colors shadow-lg shadow-[#4A3AFF]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? '保存中...' : '保存设置'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Audience Details Modal */}
      <AnimatePresence>
        {showAudienceModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-[#F0EEFF] text-[#722ED1] rounded-lg">
                      <Tag size={16} />
                    </div>
                    <h3 className="text-lg font-bold text-[#333]">适用客群规则</h3>
                  </div>
                  <button onClick={() => setShowAudienceModal(false)} className="text-[#999] hover:text-[#333]">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="bg-[#F9FAFB] rounded-xl p-5 border border-[#EEE]">
                  <div className="space-y-4 relative pl-8">
                    {filters.length > 1 && (
                      <div className="absolute left-[11px] top-4 bottom-4 w-[1px] bg-[#D3ADFF]"></div>
                    )}
                    {filters.map((filter, index) => (
                      <div key={filter.id} className="relative flex items-center space-x-3">
                        {index > 0 && (
                          <div className="absolute -left-11 top-1/2 -translate-y-1/2 flex items-center justify-center">
                            <span className="w-6 py-0.5 text-[10px] font-bold text-white bg-[#722ED1] rounded shadow-sm text-center">
                              {filter.logic}
                            </span>
                          </div>
                        )}
                        <div className="absolute -left-[26px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white border border-[#D3ADFF] rounded-full z-10 flex items-center justify-center">
                          <div className="w-[3px] h-[3px] bg-[#722ED1] rounded-full"></div>
                        </div>
                        <div className="flex-1 bg-white border border-[#DDD] rounded-lg px-4 py-2.5 text-sm text-[#333] flex items-center justify-between shadow-sm">
                          <span className="font-medium text-[#444]">{filter.field}</span>
                          <span className="text-[#666] text-xs px-2 py-0.5 bg-gray-50 rounded border border-[#EEE] mx-3">{filter.operator}</span>
                          <span className="font-bold text-[#1890FF]">{filter.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-[#EEE]">
                <button 
                  onClick={() => setShowAudienceModal(false)}
                  className="px-6 py-2 bg-[#4A3AFF] text-white rounded-lg text-sm font-medium hover:bg-[#3D2EDD] transition-colors shadow-sm"
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Follow Up Details Modal */}
      <AnimatePresence>
        {showFollowUpModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-[#E6F7FF] text-[#1890FF] rounded-lg">
                      <Clock size={16} />
                    </div>
                    <h3 className="text-lg font-bold text-[#333]">跟进时效与时段规则</h3>
                  </div>
                  <button onClick={() => setShowFollowUpModal(false)} className="text-[#999] hover:text-[#333]">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {/* Follow-up Limits */}
                  <div className="bg-[#F9FAFB] rounded-xl p-5 border border-[#EEE]">
                    <h5 className="text-xs font-bold text-[#999] uppercase tracking-widest mb-4">跟进时限配置</h5>
                    <div className="grid grid-cols-2 gap-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white p-3 rounded-lg border border-[#DDD] flex items-center justify-between shadow-sm">
                          <span className="text-xs font-bold text-[#666]">{getOrdinal(i + 1)}跟进时限</span>
                          <span className="text-sm font-bold text-[#1890FF]">
                            {i === 0 ? '30 分钟内' : '24 小时内'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Periods */}
                  <div className="bg-[#F9FAFB] rounded-xl p-5 border border-[#EEE]">
                    <h5 className="text-xs font-bold text-[#999] uppercase tracking-widest mb-4">适用时段</h5>
                    <div className="space-y-3">
                      {timePeriods.map((tp) => (
                        <div key={tp.id} className="bg-white p-3 rounded-lg border border-[#DDD] flex items-center justify-between shadow-sm">
                          <div className="flex items-center space-x-3">
                            <span className="text-xs font-bold text-[#666] px-2 py-1 bg-gray-50 rounded border border-[#EEE]">
                              {tp.days.join('、')}
                            </span>
                          </div>
                          <div className="flex items-center text-sm font-medium text-[#333] space-x-2">
                            <Clock size={14} className="text-[#999]" />
                            <span>{tp.startTime} - {tp.endTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-[#EEE]">
                <button 
                  onClick={() => setShowFollowUpModal(false)}
                  className="px-6 py-2 bg-[#4A3AFF] text-white rounded-lg text-sm font-medium hover:bg-[#3D2EDD] transition-colors shadow-sm"
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Recycle Rules Modal */}
      <AnimatePresence>
        {showRecycleRulesModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-[#EEE] flex justify-between items-center bg-white z-10">
                <h3 className="text-lg font-bold text-[#333]">回收时间规则详情</h3>
                <button onClick={() => setShowRecycleRulesModal(false)} className="text-[#999] hover:text-[#333]">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 bg-[#F5F7FA] flex-1 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-sm border border-[#EEE] overflow-hidden">
                  <div className="p-6 space-y-5">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E4E7ED]">
                      <div className="flex items-center space-x-2">
                        <div className="w-1 h-4 bg-[#1890FF] rounded-full"></div>
                        <h4 className="font-bold text-[#333] text-sm">当前校区/渠道关联回收规则</h4>
                        <span className="text-xs text-[#999] ml-2">（此为该校区/渠道下已配置的回收规则，不可在此修改）</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 relative">
                        <button 
                          onClick={() => setShowRecycleFilter(!showRecycleFilter)}
                          className={`flex items-center space-x-1 px-3 py-1.5 border rounded-lg text-sm transition-colors shadow-sm ${showRecycleFilter ? 'bg-[#4A3AFF] text-white border-[#4A3AFF]' : 'bg-white border-[#DDD] text-[#333] hover:bg-gray-50'}`}
                        >
                          <Filter size={14} />
                          <span>筛选</span>
                        </button>
                        
                        {/* Filter Panel */}
                        <AnimatePresence>
                          {showRecycleFilter && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full right-0 mt-2 w-[480px] bg-white rounded-xl shadow-xl border border-[#EEE] z-50 p-5 space-y-4"
                            >
                               {/* Row 1: 单类型 */}
                               <div className="flex items-center space-x-3">
                                 <span className="text-sm font-medium text-[#666] w-16 text-right shrink-0">单类型</span>
                                 <select 
                                  value={filterOrderType}
                                  onChange={e => setFilterOrderType(e.target.value)}
                                  className="flex-1 border border-[#DDD] rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#4A3AFF] bg-white"
                                 >
                                   <option value="全部">全部单类型</option>
                                   <option value="新单">仅新单</option>
                                   <option value="老单">仅老单</option>
                                 </select>
                               </div>

                               {/* Row 2: 分公司和校区 */}
                               <div className="flex items-center space-x-3">
                                 <span className="text-sm font-medium text-[#666] w-16 text-right shrink-0">适用范围</span>
                                 <div className="flex-1 flex space-x-2">
                                   <select 
                                    disabled
                                    value={filterBranch}
                                    className="flex-1 bg-gray-50 border border-[#DDD] rounded-lg px-2 py-1.5 text-sm text-[#999] cursor-not-allowed appearance-none"
                                   >
                                     <option value="北京分公司">北京分公司</option>
                                   </select>
                                   <select 
                                    value={filterCampus}
                                    onChange={e => setFilterCampus(e.target.value)}
                                    className="flex-1 border border-[#DDD] rounded-lg px-2 py-1.5 text-sm outline-none focus:border-[#4A3AFF] bg-white"
                                   >
                                     <option value="全部">全部校区</option>
                                     <option value="北京广渠门校区">北京广渠门校区</option>
                                     <option value="北京望京校区">北京望京校区</option>
                                   </select>
                                 </div>
                               </div>

                               {/* Row 3: 渠道 */}
                               <div className="flex items-center space-x-3">
                                 <span className="text-sm font-medium text-[#666] w-16 text-right shrink-0">渠道分类</span>
                                 <div className="flex-1 flex space-x-2">
                                   <select 
                                    disabled
                                    value={filterChannel1}
                                    className="flex-1 bg-gray-50 border border-[#DDD] rounded-lg px-2 py-1.5 text-xs text-[#999] cursor-not-allowed appearance-none"
                                   >
                                     <option value="全部">一级渠道</option>
                                     <option value="线上营销">线上营销</option>
                                     <option value="线下地推">线下地推</option>
                                   </select>
                                   <select 
                                    value={filterChannel2}
                                    onChange={e => { setFilterChannel2(e.target.value); setFilterChannel3('全部'); }}
                                    className="flex-1 border border-[#DDD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-[#4A3AFF] bg-white"
                                   >
                                     <option value="全部">全部二级</option>
                                     <option value="网络新媒体">网络新媒体</option>
                                     <option value="电商平台">电商平台</option>
                                     <option value="社区推广">社区推广</option>
                                   </select>
                                   <select 
                                    value={filterChannel3}
                                    onChange={e => setFilterChannel3(e.target.value)}
                                    className="flex-1 border border-[#DDD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-[#4A3AFF] bg-white"
                                   >
                                     <option value="全部">全部三级</option>
                                     <option value="引流产品">引流产品</option>
                                     <option value="体验课">体验课</option>
                                     <option value="常规拉新">常规拉新</option>
                                   </select>
                                 </div>
                               </div>

                               <div className="pt-2 flex justify-end">
                                 <button 
                                   onClick={() => setShowRecycleFilter(false)}
                                   className="px-4 py-1.5 bg-[#4A3AFF] text-white text-sm rounded-lg hover:bg-[#3D2EDD] transition-colors"
                                 >
                                   确认
                                 </button>
                               </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="border border-[#EEE] rounded-lg overflow-hidden">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-[#F9FAFB] text-[#666] font-bold border-b border-[#EEE]">
                          <tr>
                            <th className="px-4 py-3 whitespace-nowrap">渠道分类</th>
                            <th className="px-4 py-3 whitespace-nowrap">适用分公司</th>
                            <th className="px-4 py-3 whitespace-nowrap">适用校区</th>
                            <th className="px-4 py-3 whitespace-nowrap">单类型</th>
                            <th className="px-4 py-3 whitespace-nowrap">回收目标池</th>
                            <th className="px-4 py-3">回收触发条件</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EEE] bg-white">
                          {[
                            {
                              channel: '线上营销 / 网络新媒体 / 引流产品',
                              branch: '北京分公司',
                              campus: '北京广渠门校区',
                              type: '新单',
                              pool: '当前校区商机公海池',
                              conditions: ['客户状态未推进 > 7天', '已承诺未上门 > 7天', '已上门未关单 > 7天']
                            },
                            {
                              channel: '线上营销 / 网络新媒体 / 引流产品',
                              branch: '北京分公司',
                              campus: '北京广渠门校区',
                              type: '老单',
                              pool: '当前校区商机公海池',
                              conditions: ['客户状态未推进 > 15天']
                            },
                            {
                              channel: '线上营销 / 电商平台 / 体验课',
                              branch: '北京分公司',
                              campus: '北京广渠门校区',
                              type: '新单',
                              pool: '当前校区商机公海池',
                              conditions: ['客户状态未推进 > 5天', '已承诺未上门 > 5天']
                            },
                            {
                              channel: '线下地推 / 社区推广 / 常规拉新',
                              branch: '北京分公司',
                              campus: '北京望京校区',
                              type: '新单',
                              pool: '当前校区商机公海池',
                              conditions: ['客户状态未推进 > 3天']
                            }
                          ].filter(row => {
                            if (filterOrderType !== '全部' && row.type !== filterOrderType) return false;
                            if (filterBranch !== '全部' && row.branch !== filterBranch) return false;
                            if (filterCampus !== '全部' && row.campus !== filterCampus) return false;
                            
                            const channels = row.channel.split(' / ');
                            const c1 = channels[0] || '';
                            const c2 = channels[1] || '';
                            const c3 = channels[2] || '';

                            if (filterChannel1 !== '全部' && c1 !== filterChannel1) return false;
                            if (filterChannel2 !== '全部' && c2 !== filterChannel2) return false;
                            if (filterChannel3 !== '全部' && c3 !== filterChannel3) return false;

                            return true;
                          }).map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-[#333] font-medium whitespace-nowrap">{row.channel}</td>
                              <td className="px-4 py-3 text-[#666] whitespace-nowrap">{row.branch}</td>
                              <td className="px-4 py-3 text-[#666] whitespace-nowrap">{row.campus}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-2 py-1 text-[11px] rounded border ${row.type === '新单' ? 'bg-[#E6F7FF] text-[#1890FF] border-[#91D5FF]' : 'bg-[#FFF2E8] text-[#FA541C] border-[#FFBB96]'}`}>
                                  {row.type}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-[#666] whitespace-nowrap">{row.pool}</td>
                              <td className="px-4 py-3">
                                <div className="flex flex-wrap gap-1.5">
                                  {row.conditions.map((cond, j) => (
                                    <span key={j} className="inline-block bg-[#F0EEFF] text-[#722ED1] text-[11px] px-1.5 py-0.5 rounded border border-[#D3ADFF] whitespace-nowrap">
                                      {cond}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Pagination */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-[#EEE] flex justify-end items-center space-x-3 text-sm text-[#666]">
                    <span>共 1 条</span>
                    <select className="border border-[#DDD] rounded px-2 py-1 bg-white outline-none">
                      <option>10 条/页</option>
                    </select>
                    <div className="flex space-x-1">
                      <button className="px-2 py-1 border border-[#DDD] rounded bg-white text-[#CCC] cursor-not-allowed">&lt;</button>
                      <button className="px-2 py-1 border border-[#4A3AFF] rounded bg-[#4A3AFF] text-white">1</button>
                      <button className="px-2 py-1 border border-[#DDD] rounded bg-white text-[#CCC] cursor-not-allowed">&gt;</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TagsView() {
  const [conditions, setConditions] = useState([
    { id: 1, field: '小区房价', operator: '大于', value: '80000', placeholder: '', unit: '元/m²', logic: null },
    { id: 2, field: '在读学员占比', operator: '大于等于', value: '', placeholder: '输入比例', unit: '%', logic: '且' },
    { id: 3, field: '目标学校名称', operator: '包含', value: [{ text: '一流一类小学', color: 'blue' }, { text: '人大附小', color: 'blue' }], isTags: true, placeholder: '搜索学校', unit: '', logic: '且' },
    { id: 4, field: '学校距离', operator: '小于等于', value: '', placeholder: '输入距离', unit: 'km', logic: '或' },
    { id: 5, field: '线索来源', operator: '属于以下', value: [{ text: '口碑(转介绍)', color: 'purple' }, { text: '美大(美团点评)', color: 'pink' }], isTags: true, placeholder: '搜索渠道', unit: '', logic: '且' }
  ]);

  const tagColors: Record<string, string> = {
    blue: 'bg-[#F0F5FF] text-[#2F54EB] border-[#ADC6FF]',
    purple: 'bg-[#F9F0FF] text-[#722ED1] border-[#D3ADFF]',
    pink: 'bg-[#FFF0F6] text-[#EB2F96] border-[#FFADD2]'
  };

  const removeCondition = (id: number) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const toggleLogic = (id: number) => {
    setConditions(conditions.map(c =>
      c.id === id ? { ...c, logic: c.logic === '且' ? '或' : '且' } : c
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-[#594AF1] text-white flex items-center justify-center">
              <Star size={14} fill="currentColor" />
            </div>
            <h3 className="text-lg font-bold text-[#333]">重点单标准配置</h3>
            <span className="text-sm text-[#999]">通过灵活的组合条件筛选高价值线索</span>
          </div>
          <p className="text-xs text-[#AAA]">
            初步标记仅限未跟进前，跟进后将会自动根据客户产生主动或被动高意向行为进行AI自动标记
          </p>
        </div>
        <button className="bg-[#5C4DDF] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#483BB5] transition-colors flex items-center space-x-2 shadow-sm">
          <Save size={16} />
          <span>保存配置</span>
        </button>
      </div>

      <div className="relative pt-4 pl-14 pr-4 max-w-5xl">
        {/* left vertical line */}
        <div className="absolute left-[27px] top-[36px] bottom-[30px] w-[1.5px] bg-[#6657DE]" />

        <div className="space-y-4">
          {conditions.map((item) => (
            <div key={item.id} className="relative z-10">
              {/* logic node button */}
              {item.logic && (
                <div
                  onClick={() => toggleLogic(item.id)}
                  className="absolute -left-[40.5px] top-1/2 -translate-y-1/2 w-[22px] h-[22px] bg-white border-[1.5px] border-[#6657DE] rounded flex items-center justify-center text-[10px] text-[#6657DE] font-medium z-20 cursor-pointer hover:bg-[#F0EEFF] transition-colors select-none"
                >
                  {item.logic}
                </div>
              )}

              <div className="bg-white border border-[#EEE] rounded-lg p-2.5 flex items-center space-x-4 shadow-sm hover:border-[#D3ADFF] transition-colors">
                <div className="w-[160px] relative">
                  <select className="w-full border border-[#DDD] rounded text-sm px-3 py-2 appearance-none bg-white focus:outline-none focus:border-[#594AF1] cursor-pointer hover:bg-gray-50 transition-colors text-[#333]">
                    <option>{item.field}</option>
                  </select>
                  <ChevronRight size={14} className="absolute right-3 top-2.5 rotate-90 text-[#999] pointer-events-none" />
                </div>

                <div className="w-[140px] relative">
                  <select className="w-full border border-[#DDD] rounded text-sm px-3 py-2 appearance-none bg-white focus:outline-none focus:border-[#594AF1] cursor-pointer hover:bg-gray-50 transition-colors text-[#333]">
                    <option>{item.operator}</option>
                  </select>
                  <ChevronRight size={14} className="absolute right-3 top-2.5 rotate-90 text-[#999] pointer-events-none" />
                </div>

                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 border border-[#DDD] rounded px-3 py-1.5 flex flex-wrap items-center gap-2 min-h-[38px] bg-white">
                    {item.isTags ? (
                      <>
                        {(item.value as { text: string, color: string }[]).map((tag, i) => (
                          <div key={i} className={`border text-xs px-2.5 py-1 flex items-center space-x-1 ${tagColors[tag.color] || tagColors.blue}`} style={{ borderRadius: '4px' }}>
                            <span>{tag.text}</span>
                            <X size={12} className="cursor-pointer opacity-70 hover:opacity-100" />
                          </div>
                        ))}
                        <input type="text" placeholder={item.placeholder} className="flex-1 outline-none text-sm min-w-[80px] text-[#333] placeholder:text-[#BBB]" />
                      </>
                    ) : (
                      <input
                        type="text"
                        defaultValue={item.value as string}
                        placeholder={item.placeholder}
                        className="w-full outline-none text-sm text-[#333] placeholder:text-[#BBB]"
                      />
                    )}
                  </div>
                  {item.unit ? (
                    <span className="text-sm text-[#666] w-8 text-center">{item.unit}</span>
                  ) : (
                    <span className="w-8" />
                  )}
                </div>

                <button onClick={() => removeCondition(item.id)} className="text-[#CCC] hover:text-[#FF4D4F] p-1 flex-shrink-0 transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
