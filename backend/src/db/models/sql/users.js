import db  from '../../config/mysql.config.js'
import { DataTypes } from 'sequelize';

const User = db.define("User", {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountType: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "users",
    timestamps: false
});

export default User;


// const User = (sequelize, DataTypes) => {
//     const user = sequelize.define("User", {
//         userId: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             primaryKey: true
//         },
//         emailId: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             primaryKey: true
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         accountType: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         created_date: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: DataTypes.NOW,
//             get() {
//                 return this.getDataValue('created_date').toLocaleString('en-GB', { timeZone: 'UTC' });
//             }
//         }
//     }, {
//         tableName: "user",
//         timestamps: false
//     });

//     return user;
// }

// export default User;