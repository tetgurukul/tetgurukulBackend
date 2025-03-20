//Async handler for production grade project.
//Basically below snippet is a wrapper function which will be used most of the...
//...in our code.

const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((error) => next(error))
    }
}

export {asyncHandler}










/*
This asyncHandler is written using try-catch block. Above it is written using...
//...promises
const asyncHandler = (fn) => async (req, res, next) => {

    try {

        await fn(req, res, next)
        
    } catch (error) {

        res.status(error.code || 500).json({
            success: true,
            message: error.message
        })
        
    }

} 

*/