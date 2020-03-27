import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Doctor from '../app/models/Doctor';
import Nurse from '../app/models/Nurse';
import Patient from '../app/models/Patient';
import Appointment from '../app/models/Appointment';

const models = [User, Patient, Appointment, Doctor, Nurse];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}
export default new Database();
