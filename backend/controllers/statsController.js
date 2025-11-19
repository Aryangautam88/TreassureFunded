// controllers/statscontroller.js
const moment = require('moment');
const User = require('../models/User');
const Deposit = require('../models/Deposit');
const Ticket = require('../models/Ticket');

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const deposits = await Deposit.find({});
    const totalDeposits = deposits.reduce((sum, d) => sum + d.amount, 0);
    const pendingKYC = await User.countDocuments({ kycStatus: 'pending' });
    const pendingTickets = await Ticket.countDocuments({ status: 'pending' });

    // Weekly grouping
    const groupByWeek = (data, dateField) => {
      const grouped = {};
      data.forEach((item) => {
        const week = moment(item[dateField]).startOf('isoWeek').format('YYYY-[W]WW');
        grouped[week] = (grouped[week] || 0) + 1;
      });
      return grouped;
    };

    const weeklyUsersRaw = await User.find({}, 'createdAt');
    const weeklyDepositsRaw = await Deposit.find({}, 'createdAt');
    const weeklyKycRaw = await User.find({ kycStatus: 'approved' }, 'kycApprovedAt');
    const weeklyTicketsRaw = await Ticket.find({}, 'createdAt');

    const paymentMethodsCount = {};
    deposits.forEach(dep => {
      const method = dep.paymentMethod;
      if (method) paymentMethodsCount[method] = (paymentMethodsCount[method] || 0) + 1;
    });

    res.json({
      totalUsers,
      totalDeposits,
      pendingKYC,
      pendingTickets,
      paymentMethodsCount,
      weeklyUsers: groupByWeek(weeklyUsersRaw, 'createdAt'),
      weeklyDeposits: groupByWeek(weeklyDepositsRaw, 'createdAt'),
      weeklyKYC: groupByWeek(weeklyKycRaw, 'kycApprovedAt'),
      weeklyTickets: groupByWeek(weeklyTicketsRaw, 'createdAt'),
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

module.exports = { getStats };
