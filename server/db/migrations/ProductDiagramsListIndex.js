export async function up(queryInterface) {
    try {
        await queryInterface.addIndex('ProductDiagramsLists', ['ProductId', 'ProductPartsDiagramId']);
    } catch (err) {
        throw err;
    }
}