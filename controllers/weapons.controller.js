const Weapon = require("../models/Weapon.model");

module.exports.weaponsController = {
    addWeapon: async (req, res) => {
        try {
           await Weapon.create ({
         name: req.body.name,
         reviews: req.body.reviews,
         category: req.body.category 
            });
            res.json("успешно добавлена");
        }catch (e) {
            res,json("e");
        }
    },
    deleteWeapon: async (req, res) => {
        try {
        await Weapon.findByIdAndDelete (req.params.id);

res.json("успешно удалена");
        }catch(e) {
            res.json(e);
        }
    },
     editWeapon: async (req, res) => {
         try {
             await Weapon.findByIdAndEdit (req.params.ig, req.body);
             res.json("успешно изменена");
         }catch(e) {
             res.json(e);
         }
     },
     getWeapon: async (req, res) => {
         try {
        const data = await Weapon.findById (req.params.id);
        res.json(data);

         }catch(e) {
             res.json(e);
         }
     },
     getWeapons: async (req, res) => {
         try {
         const data = await Weapon.find ();
         res.json(data);

     }catch(e) {
         res.json(e)
     }
    },
    getImage: async (req, res) => {
        try {
          const { image } = req.files;
          const fileName = `/image/${Math.random() * 10000}${path.extname(
            image.name
          )}`;
          image.mv(fileName, async (err) => {
            if (err) {
              console.log(err);
            } else {
              const weapons = await Weapon.findById(req.params.id);
              weapons.pathToImage = fileName;
              await weapons.save();
              console.log(fileName);
              res.json("Файл загружен");
            }
          });
        } catch (err) {
          res.json(err);
        }
      },
    };