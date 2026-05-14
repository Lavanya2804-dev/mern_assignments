let student={
    rollno:1,
    name:"ravi"
}

console.log(student.rollno)
console.log(student.name)
console.log(student.city)
console.log(student.city?.length??"property not existed")

// ?--optional chaining
// ??--nullish coalescing----to dont show undefined as default 