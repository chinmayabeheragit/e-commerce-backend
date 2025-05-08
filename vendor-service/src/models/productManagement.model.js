const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const shortid = require('shortid');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    defaultValue: () => `PROD-${shortid.generate()}`,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('category', value.toLowerCase());
    },
  },
  subCategory: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue(
          'subCategory',
          value.map((v) => v.toLowerCase())
        );
      }
    },
  },
  ageGroup: {
    type: DataTypes.ENUM("0-6", "6-12", "12-18", "18-24", "24+"),
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  regularPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discountPercentage: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 100,
    },
  },
  loyaltyPoints: {
    type: DataTypes.INTEGER,
  },
  dateAdded: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  productType: {
    type: DataTypes.STRING,
  },
  stockStatus: {
    type: DataTypes.ENUM("In Stock", "Out of Stock", "Limited Stock"),
  },
  quantityInStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  alreadySold: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  attribute: {
    type: DataTypes.STRING,
  },
  subAttributes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  size: {
    type: DataTypes.ENUM("XS", "S", "M", "L", "XL", "XXL"),
  },
  weight: {
    type: DataTypes.STRING,
  },
  vendorId: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'products',
  timestamps: false,
});

module.exports = Product;
