const sut = require('./mongo-helper');

describe('Mongo Helper', () => {
    beforeAll(async () => {        
        await sut.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await sut.disconnect();
    });

    test('Should reconnect when getCollection() is invoked and client is disconnected.', async () => {
        expect(sut.db).toBeTruthy();
        await sut.disconnect();
        expect(sut.db).toBeFalsy();
        await sut.getCollection('test');
        expect(sut.db).toBeTruthy();
    });

    test('Should return an ObjectId when receive a string.', () => {
        const object = sut.getObjectId('5ec1d6834fad94348819d3a0');
        expect(object).toMatchObject(sut.getObjectId('5ec1d6834fad94348819d3a0'));
    });
});