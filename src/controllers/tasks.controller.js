const pool = require("../db");

const getAllTasks = async (req,res,next) =>{
    try {
        const AllTasks = await pool.query("SELECT * FROM vehiculo");
        res.json(AllTasks.rows);
    } catch (error) {
        next(error);
    }

};

const getTask = async(req,res,next) =>{
    try {
        const {id} = req.params;

        const result = await pool.query('SELECT * FROM vehiculo WHERE id_veh = $1', [id])

        if(result.rows.length === 0) 
            return res.status(404).json({
                message:'Vehiculo no encontrado'
            })

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createTask = async(req,res,next) =>{
    const {id_veh, numserie_veh, marca_veh, modelo_veh, aniomodelo_veh, precio_veh, descripcion_veh} = req.body

    try {
        const result = await pool.query("INSERT INTO vehiculo (id_veh, numserie_veh, marca_veh, modelo_veh, aniomodelo_veh, precio_veh, descripcion_veh) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [
            id_veh, 
            numserie_veh, 
            marca_veh, 
            modelo_veh, 
            aniomodelo_veh, 
            precio_veh, 
            descripcion_veh
        ]);
    
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteTask = async(req,res,next) =>{

    try {
        const {id} = req.params;
        const result = await pool.query('DELETE FROM vehiculo WHERE id_veh = $1', [id])
        if(result.rowCount === 0)
            return res.status(404).json({
                message:"Vehiculo no encontrado"
            });

        return res.sendStatus(204); 
    } catch (error) {
        next(error);
    }
};


const updateTask = async(req,res,next) =>{

    try {
        const {id} = req.params;
        const {id_veh, numserie_veh, marca_veh, modelo_veh, aniomodelo_veh, precio_veh, descripcion_veh} = req.body

        const result = await pool.query(
            "UPDATE vehiculo SET id_veh = $1, numserie_veh = $2, marca_veh = $3, modelo_veh = $4, aniomodelo_veh = $5, precio_veh = $6, descripcion_veh = $7 WHERE id_veh = $8 RETURNING *",
            [id_veh, numserie_veh, marca_veh, modelo_veh, aniomodelo_veh, precio_veh, descripcion_veh, id]
        );

        if (result.rows.length === 0)
            return res.status(400).json({
                message:"Vehiculo no encontrado"
            })
        
        return res.json(result.rows[0]);
    } catch (error) {
        
    }
    
};

module.exports = {
    getAllTasks, 
    getTask, 
    createTask,
    deleteTask, 
    updateTask
}