"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      teacher_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      pin: DataTypes.STRING,
      photo: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "superadmin"],
        defaultValue: "admin"
      }
    },
    {
      underscored: true
    }
  );
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};