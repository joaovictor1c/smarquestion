module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'smartQuestion',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
