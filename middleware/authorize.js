export function authorizeModification(req, res, next) {
  const { user } = req;
  const { userId } = req.params;

  const isParent = user?.role === "parent";
  const isOwnChild =
    user?.role === "child" && String(userId) === String(user.id);

  if (!isParent && !isOwnChild) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
}

export default authorizeModification;
