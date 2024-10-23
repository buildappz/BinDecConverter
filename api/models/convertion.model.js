module.exports = (sequelize, Sequelize) => {
    const Convertion = sequelize.define("convertion", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,  // Set as primary key
        autoIncrement: true // Enable auto-increment
      },
      owner: {
        type: Sequelize.BIGINT
      },
      input: {
        type: Sequelize.STRING
      },
      output: {
        type: Sequelize.STRING
      },
      convertion: {
        type: Sequelize.BOOLEAN,
        comment: '1=Binary to Decimal, 0=Decimal to Binary' // Add a comment to describe the conversion logic
      },
      datetime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Set current date and time by default
      }
    });
  
    return Convertion;
  };