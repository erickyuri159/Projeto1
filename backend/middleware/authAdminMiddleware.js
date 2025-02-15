const authenticateAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next();
  };
  
  module.exports = authenticateAdmin;