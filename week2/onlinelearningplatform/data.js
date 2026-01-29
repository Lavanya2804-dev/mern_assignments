export const users = [
  { id: 1, name: "Ravi", role: "student", active: true },
  { id: 2, name: "Anil", role: "admin", active: true },
  { id: 3, name: "Suman", role: "student", active: false }
];

export const courses = [
  { id: 101, title: "JavaScript", price: 999, published: true },
  { id: 102, title: "React", price: 1499, published: false },
  { id: 103, title: "Node", price: 1299, published: true }
];

export const cart = [
  { courseId: 101, qty: 1 },
  { courseId: 103, qty: 2 }
];

export const roles = {
  admin: ["create", "update", "delete", "view"],
  student: ["view"]
};
