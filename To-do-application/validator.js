//Requirements:
//     Create a modular todo app with 3 separate files:
    
//i. validator.js - Input validation
    // TODO: Export these validation functions
    // 1. Validate task title (not empty, min 3 chars)
  export function validateTitle(title) {
    if(title.lenght===0){
        return "title is empty"
    }
    if(title.length<3){
        return "title should have min of 3 chars"
    } 
    return true;
  }

// 2. Validate priority (must be: low, medium, high)
     export function validatePriority(priority) {
    if (
        priority !== "low" &&
        priority !== "medium" &&
        priority !== "high"
    )     {
    return "Priority must be low, medium, or high";
  }

  return true;
}
            
                      
// 3. Validate due date (must be future date)
        export function validateDueDate(date) {
        let today = new Date();
        let dueDate = new Date(date);
        if (dueDate <= today) {
            return "Due date must be a future date";
        }
        return true;
    }           


                        