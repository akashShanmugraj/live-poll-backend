export default class UtilityController{
    static async apiReturnREQBody(req, res, next) {
        res.send(req.body).status(200);
    }
    
    static async apiPostRequest(req, res, next) {
        try{
            const requestObject = JSON.parse(req.body)
            res.send("OK").status(200);
        } catch (e) {
            console.log(e)
            res.send(e).status(500)
        }
    }

    static async info(req, res, next) {
        res.send("NodeJS server based on ExpressJS for Live Poll Tracker Project, by @akashShanmugraj").status(200);
    }
}