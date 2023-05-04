module.exports = (sequelize, DataTypes) => {
    const ProdutoCor = sequelize.define('ProdutoCor', {
        produto_id: {
            type:DataTypes.STRING(45),
            allowNull: false
        },
        cor_id: {
            type:DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 'produto_cor',
        timestamps: false
    })

    return ProdutoCor
}