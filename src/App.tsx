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
  Clock,
  Tag,
  Trash2,
  Edit3,
  CheckCircle2,
  Check,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TabType = 'monthly' | 'process' | 'aging' | 'tags';

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

function MonthlyPlanView() {
  const [showModal, setShowModal] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('2026年02月');
  const [pickerYear, setPickerYear] = useState(2026);

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
        <button className="bg-[#1890FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#40A9FF] transition-colors flex items-center space-x-2">
          <Download size={16} />
          <span>导入数据</span>
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
              <th className="px-6 py-4">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEE]">
            {[
              { name: '张三', month: '2026年2月', target: 5, cash: 4, refund: 0, class: 3 },
              { name: '李四', month: '2026年2月', target: 5, cash: 4, refund: 0, class: 3 },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.month}</td>
                <td className="px-6 py-4">{row.target}</td>
                <td className="px-6 py-4">{row.cash}</td>
                <td className="px-6 py-4">{row.refund}</td>
                <td className="px-6 py-4">{row.class}</td>
                <td className="px-6 py-4">
                  <button className="bg-[#722ED1] text-white px-4 py-1 rounded text-xs hover:bg-[#9254DE] transition-colors">
                    调整
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Monthly Task Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-[#333]">新增月份任务</h3>
                  <button onClick={() => setShowModal(false)} className="text-[#999] hover:text-[#333] transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#999] uppercase tracking-widest">销售姓名</label>
                    <select className="w-full border border-[#DDD] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF] appearance-none bg-white">
                      <option value="">请选择销售</option>
                      <option value="张三">张三</option>
                      <option value="李四">李四</option>
                      <option value="王五">王五</option>
                    </select>
                  </div>
                  <div className="space-y-2 relative">
                    <label className="text-xs font-bold text-[#999] uppercase tracking-widest">月份</label>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value={selectedMonth}
                        onClick={() => setShowMonthPicker(!showMonthPicker)}
                        placeholder="2026年02月"
                        className="w-full border border-[#DDD] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF] cursor-pointer"
                      />
                      <Clock size={18} className="absolute right-4 top-3.5 text-[#CCC] pointer-events-none" />
                    </div>

                    {/* Month Picker Dropdown */}
                    <AnimatePresence>
                      {showMonthPicker && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#EEE] rounded-xl shadow-xl z-50 p-4"
                        >
                          <div className="flex justify-between items-center mb-4 border-b border-[#F5F5F5] pb-2">
                            <button onClick={() => setPickerYear(pickerYear - 1)} className="p-1 hover:bg-gray-100 rounded text-[#999]">
                              <ArrowLeft size={14} />
                            </button>
                            <span className="font-bold text-[#333]">{pickerYear}年</span>
                            <button onClick={() => setPickerYear(pickerYear + 1)} className="p-1 hover:bg-gray-100 rounded text-[#999]">
                              <ChevronRight size={14} />
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {months.map((m, idx) => {
                              const monthStr = `${pickerYear}年${m}`;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setSelectedMonth(monthStr);
                                    setShowMonthPicker(false);
                                  }}
                                  className={`py-2 text-xs rounded-lg transition-colors ${selectedMonth === monthStr ? 'bg-[#4A3AFF] text-white font-bold' : 'hover:bg-[#F0EEFF] text-[#666]'}`}
                                >
                                  {m}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#999] uppercase tracking-widest">招生人头目标</label>
                    <input
                      type="number"
                      placeholder="请输入目标人数"
                      className="w-full border border-[#DDD] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#999] uppercase tracking-widest">现金目标 (万元)</label>
                    <input
                      type="number"
                      placeholder="请输入现金目标"
                      className="w-full border border-[#DDD] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#999] uppercase tracking-widest">退费人数上限</label>
                    <input
                      type="number"
                      placeholder="请输入退费上限"
                      className="w-full border border-[#DDD] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#999] uppercase tracking-widest">进班人数目标</label>
                    <input
                      type="number"
                      placeholder="请输入进班目标"
                      className="w-full border border-[#DDD] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#4A3AFF]/20 focus:border-[#4A3AFF]"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-8 py-3 rounded-lg border border-[#DDD] text-[#666] font-medium hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-8 py-3 rounded-lg bg-[#52C41A] text-white font-medium hover:bg-[#73D13D] transition-colors shadow-lg shadow-[#52C41A]/20"
                  >
                    确认新增
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
              '跟进次数：1次'
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
              '跟进次数：3次'
            ]
          }
        ].map((rule, i) => (
          <div key={i} className="bg-white border border-[#EEE] rounded-xl p-6 shadow-sm relative border-l-4 border-l-[#722ED1]">
            <div className="absolute top-6 right-6 flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked readOnly className="w-4 h-4 text-[#1890FF] rounded border-gray-300 focus:ring-[#1890FF]" />
                <span className="text-sm text-[#666]">已启用</span>
              </label>
              <button className="text-[#666] hover:text-[#333] text-sm flex items-center space-x-1">
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
              {rule.details.map((detail, j) => (
                <div key={j} className="flex items-center text-sm text-[#333]">
                  <span className="font-medium min-w-[80px]">{detail.split('：')[0]}：</span>
                  <span className="text-[#666]">{detail.split('：')[1]}</span>
                </div>
              ))}
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
                  {modalStep === 1 ? '创建新的规则' : '配置规则详情'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-[#999] hover:text-[#333]">
                  <X size={24} />
                </button>
              </div>

              {modalStep === 1 ? (
                <div className="space-y-8">
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
                </div>
              ) : (
                <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                  {/* Scope Selection */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium text-[#666] w-20">适用分公司</label>
                      <select className="flex-1 border border-[#DDD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20">
                        <option>北京分公司</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium text-[#666] w-20">适用校区</label>
                      <select className="flex-1 border border-[#DDD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20">
                        <option>北京广渠门校区</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-[#666] w-20">适用渠道</label>
                    <div className="flex-1 flex space-x-3">
                      <select className="flex-1 border border-[#DDD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20"><option>线上营销</option></select>
                      <select className="flex-1 border border-[#DDD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20"><option>网络新媒体</option></select>
                      <select className="flex-1 border border-[#DDD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/20"><option>引流产品</option></select>
                    </div>
                  </div>

                  {/* Filter Target Audience */}
                  <div className="bg-[#F9FAFB] rounded-2xl p-6 border border-[#EEE] space-y-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-[#F0EEFF] text-[#722ED1] rounded-lg">
                        <Tag size={18} />
                      </div>
                      <h4 className="font-bold text-[#333]">筛选适用客群</h4>
                    </div>

                    <div className="space-y-0 relative pl-10">
                      {/* Vertical Line */}
                      {filters.length > 1 && (
                        <div className="absolute left-4 top-8 bottom-8 w-[1px] bg-[#D3ADFF]"></div>
                      )}

                      {filters.map((filter, index) => (
                        <div key={filter.id} className="relative py-4">
                          {index > 0 && (
                            <div className="absolute -left-10 top-0 -translate-y-1/2 flex items-center justify-center w-12 h-8 z-20">
                              <div className="flex bg-white border border-[#722ED1] rounded-md overflow-hidden shadow-sm -translate-x-1">
                                <button
                                  onClick={() => updateFilterLogic(filter.id, '且')}
                                  className={`w-6 py-1 text-[10px] font-bold transition-colors ${filter.logic === '且' ? 'bg-[#722ED1] text-white' : 'text-[#666] hover:bg-gray-50'}`}
                                >
                                  且
                                </button>
                                <button
                                  onClick={() => updateFilterLogic(filter.id, '或')}
                                  className={`w-6 py-1 text-[10px] font-bold transition-colors ${filter.logic === '或' ? 'bg-[#722ED1] text-white' : 'text-[#666] hover:bg-gray-50'}`}
                                >
                                  或
                                </button>
                              </div>
                            </div>
                          )}

                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-3"
                          >
                            <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-[#D3ADFF] rounded-full z-10 flex items-center justify-center">
                              <div className="w-1 h-1 bg-[#722ED1] rounded-full"></div>
                            </div>

                            <select className="flex-1 border border-[#DDD] rounded-xl px-4 py-2.5 text-sm bg-white appearance-none focus:ring-2 focus:ring-[#4A3AFF]/20">
                              <option>{filter.field}</option>
                            </select>
                            <select className="w-32 border border-[#DDD] rounded-xl px-4 py-2.5 text-sm bg-white appearance-none focus:ring-2 focus:ring-[#4A3AFF]/20">
                              <option>{filter.operator}</option>
                              <option>不等于</option>
                            </select>
                            <select className="flex-1 border border-[#DDD] rounded-xl px-4 py-2.5 text-sm bg-white appearance-none focus:ring-2 focus:ring-[#4A3AFF]/20">
                              <option>{filter.value}</option>
                              <option>B类客户</option>
                              <option>C类客户</option>
                              <option>D类客户</option>
                            </select>
                            {filters.length > 1 && (
                              <button onClick={() => removeFilter(filter.id)} className="text-[#FF4D4F] p-2 hover:bg-red-50 rounded-full transition-colors">
                                <Trash2 size={18} />
                              </button>
                            )}
                          </motion.div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={addFilter}
                      className="w-full py-3 border-2 border-dashed border-[#DDD] rounded-xl text-[#999] text-sm hover:border-[#4A3AFF] hover:text-[#4A3AFF] transition-all flex items-center justify-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>添加筛选条件</span>
                    </button>
                  </div>

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

                      {/* Integrated Behavior Selection */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#999] uppercase tracking-widest">跟进行为定义 (多选)</label>
                        <div className="grid grid-cols-2 gap-3">
                          {behaviors.map((b) => (
                            <div
                              key={b.id}
                              onClick={() => toggleBehavior(b.id)}
                              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${selectedBehaviors.includes(b.id)
                                ? 'bg-[#F0EEFF] border-[#722ED1] shadow-sm'
                                : 'bg-white border-[#DDD] hover:border-[#722ED1]/50'
                                }`}
                            >
                              <div className="flex items-center space-x-2">
                                <b.icon size={16} className={selectedBehaviors.includes(b.id) ? 'text-[#722ED1]' : 'text-[#999]'} />
                                <span className={`text-xs font-medium ${selectedBehaviors.includes(b.id) ? 'text-[#722ED1]' : 'text-[#666]'}`}>
                                  {b.label}
                                </span>
                              </div>
                              <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedBehaviors.includes(b.id) ? 'bg-[#722ED1] border-[#722ED1]' : 'border-[#DDD]'
                                }`}>
                                {selectedBehaviors.includes(b.id) && <CheckCircle2 size={10} className="text-white" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
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

                    <div className="w-full h-[1px] bg-[#EEE]"></div>

                    {/* Timeout Warning */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="timeout-warn"
                          className="w-4 h-4 text-[#1890FF] rounded border-gray-300 cursor-pointer"
                          checked={showTimeoutWarn}
                          onChange={(e) => setShowTimeoutWarn(e.target.checked)}
                        />
                        <label htmlFor="timeout-warn" className="text-sm font-bold text-[#333] cursor-pointer">超时预警</label>
                      </div>

                      <AnimatePresence>
                        {showTimeoutWarn && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-7 space-y-4 overflow-hidden"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center border border-[#DDD] rounded-lg overflow-hidden">
                                <input
                                  type="text"
                                  placeholder="请输入"
                                  className="px-4 py-2 text-sm w-20 focus:outline-none"
                                  value={reminderValue || ''}
                                  onChange={(e) => setReminderValue(Number(e.target.value))}
                                />
                                <select
                                  className="bg-gray-50 border-l border-[#DDD] text-xs text-[#666] px-2 py-2 focus:outline-none"
                                  value={reminderUnit}
                                  onChange={(e) => setReminderUnit(e.target.value)}
                                >
                                  <option>小时前</option>
                                  <option>分钟前</option>
                                  <option>天前</option>
                                </select>
                              </div>
                              <span className="text-sm text-[#666]">无跟进触发预警提醒</span>
                            </div>

                            {validationError && (
                              <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xs text-[#FF4D4F] font-medium flex items-center space-x-1"
                              >
                                <span>⚠️ {validationError}</span>
                              </motion.p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      onClick={() => setModalStep(1)}
                      className="px-8 py-3 rounded-lg border border-[#DDD] text-[#666] font-medium hover:bg-gray-50 transition-colors"
                    >
                      上一步
                    </button>
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
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
