module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('patients', 'appointment_id', {
      type: Sequelize.INTEGER,
      references: { model: 'appointments', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('patients', 'appointment_id');
  },
};
