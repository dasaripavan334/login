exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }
};

exports.isOwner = (req, res, next) => {
    if (req.user && req.user.role === 'owner') {
        next();
    } else {
        return res.status(403).json({ message: 'Unauthorized: Store Owner access required' });
    }
};

// ... other role-based middleware