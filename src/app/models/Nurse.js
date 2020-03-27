import Sequelize, { Model } from 'sequelize';

class Nurse extends Model {
  static init(sequelize) {
    super.init(
      {
        coren: Sequelize.STRING,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        number_cell: Sequelize.STRING,
        date_birth: Sequelize.STRING,
        cpf: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        address: Sequelize.STRING,
        district: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'nurses',
      }
    );
    Nurse.removeAttribute('id');
    return this;
  }
}

export default Nurse;
