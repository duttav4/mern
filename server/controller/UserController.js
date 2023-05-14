import UserModel from "../models/UserModel.js";

/* get all users from usermodel */
export const getAllUsersController = async ( req, res ) =>
{
    const page = req.query.page || 1;
    const query = req.query.q || "";

    //put all your query params here
    try
    {
        const Items_per_page = 5;
        const skip = ( page - 1 ) * Items_per_page;
        const count = await UserModel.countDocuments( { name: { $regex: new RegExp( '^' + query ) } } );
        const users = await UserModel.find( { name: { $regex: new RegExp( '^' + query ) } } ).sort( { createdAt: -1 } ).limit( Items_per_page ).skip( skip );
        const pageCount = Math.round( count / Items_per_page );
        if ( users )
        {
            res.status( 200 ).send( {
                success: true,
                message: "User List",
                count: users.length,
                pagination: {
                    count,
                    pageCount
                },
                users
            } );
        }
    } catch ( error )
    {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            message: "error in getting users"
        } );
    }
};

export const editUSerController = async ( req, res ) =>
{
    try
    {
        const id = req.params.id;
        const { updatedName, updatedemail, updatedrole } = req.body;
        const result = await UserModel.findByIdAndUpdate( id, { name: updatedName, email: updatedemail, role: updatedrole }, { new: true } );
        res.status( 200 ).send( {
            success: true,
            message: "Updated Successfully",
            result
        } );

    } catch ( error )
    {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            message: "error in updating user"
        } );
    }
};

export const deleteUSerController = async ( req, res ) =>
{
    try
    {
        const id = req.params.id;
        await UserModel.findByIdAndDelete( id );
        res.status( 200 ).send( {
            success: true,
            message: "User deleted successfully"
        } );
    } catch ( error )
    {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            message: "error in delete"
        } );
    }
};