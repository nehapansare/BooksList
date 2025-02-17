// controllers/other.js
export const getServer = (req, res) => {
    res.json({ message: "Welcome to server" });
  };
  
  export const getHealth=(req, res) => {
    res.json({ message: "Server is running123" });
  }
  export const getNotFound= (req, res) => {
    res.json({ message: "NOT Found" });
  }