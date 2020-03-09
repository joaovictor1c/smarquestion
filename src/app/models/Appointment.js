import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        type_appointment: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        user_id: Sequelize.INTEGER,
        patient_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Patient, {
      foreignKey: 'patient_id',
      as: 'patients',
    });
  }
}

export default Appointment;
