var request = require('request')

describe('calc', () => {
    it("multiply 2 by 2 should return 4", () => {
        expect(2 * 2).toBe(4)
    })
})

describe("getMessages", () => {
    it("should return status cod 200!", (done) => {
        request.get("http://localhost:3000/messages", (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })

    it("should return a list, with size of gt zero!", (done) => {
        request.get("http://localhost:3000/messages", (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})