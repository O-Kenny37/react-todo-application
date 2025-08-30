import { useEffect, useState, useCallback } from "react";

function TodoApp() {
    // const [plans, setPlans] = useState([]);

    // SAVE THE PLANS IN LOCALSTORAGE
    // const [plans, setPlans] = useState(() => {
    //     const savedPlans = localStorage.getItem("plans");
    //     return savedPlans ? JSON.parse(savedPlans) : [];
    // });

    // SAVE THE PLANS IN LOCALSTORAGE
  
    const [plans, setPlans] = useState(() => {
     return JSON.parse(localStorage.getItem("plans")) || [];
    });

    // WHENEVER THE PAGE LOADS
    useEffect(() => {
        localStorage.setItem('plans', JSON.stringify(plans));
    }, [plans]);

    const [planInput, setPlanInput] = useState("");
    // const [vary, setVary] = useState(2);

    // const varies = useCallback(() => {
    //     setVary( (vary) => 
    //         {vary < 3 ? console.log(vary + 1) : console.log(vary)} 
    // )
    // })

    // DATE
  
    const days= ["Sun","Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    
    const month = ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const today = new Date();

    const day = days[today.getDay()];
    const date = today.getDate();
    const mnth = month[today.getMonth()];
    const year = today.getFullYear();
    
    const currentDate = `${day}-${date}-${mnth}-${year}`;

    // TIME
    const currentHour = (today.getHours());
    const currentMin = (today.getMinutes());
    const currentSec = (today.getSeconds());

    let mer;
    // From 1 to 12 is am, 13 - 24 is pm 
   const meridian = currentHour <= 12 ? mer = 'am' : mer ='pm';

//    console.log(meridian)
    const currentTime = `${currentHour}:${currentMin}:${currentSec}:${meridian}`;



    // useEffect(() => {
    //     console.log(currentTime);
    // }, [varies]);


    // ADD A NEW PLAN
    const addPlan = () => {

        if(!planInput.trim()) {
            alert('Please input a plan.')
        }

        if(planInput.trim()) {
            const newPlans = {
                id: Date.now(),
                text: planInput,
                done: false,
                currentTime,
                currentDate
            };
            
            setPlans((prevPlans) => ([
                ...prevPlans,
                newPlans
            ]));
            setPlanInput("");
            console.log(newPlans);
        }
    }

    // DELETE A PLAN
    const deletePlan = (planId) => {  
        if(window.confirm('Are you sure?')) {
            setPlans(plans.filter((plan) => plan.id !== planId ));
        }
        console.log(planId);
    }
    // CLEAR ALL PLANS
    const clearPlans = () => {
        if(window.confirm("Are you sure?")) {
            setPlans([]);
        }
    }
    // DONE CHECKBOX MARK
    const doneCheck = (planId) => {
        setPlans(
            plans.map((plan) => 
                plan.id === planId ? {
                    ...plan, done: !plan.done
                } : plan
            )
        )
    }

    return(
        <>
        <div className="plans_container">

        <span className="add_input_wrapper">
            <input type="text" placeholder="Input plan..." value={planInput} onChange={(event) => {
                setPlanInput(event.target.value);
                console.log(event)
            }}/>

            <button className="add_btn" onClick={ addPlan }>Add</button>

        </span>

            <ul className="plans_list">
                {plans.map((plan) => 
                <li key={plan.id} className="list_bg">

                    <div className="date_wrapper">

                    <span className="day_wrapper">
                        <span className={plan.done ? "done_text" : ""}>
                          {currentDate}
                        </span>
                    </span>

                    <span className="time_wrapper">
                      <span className={plan.done ? "done_text" : ""}>
                        ({plan.currentTime})
                        </span>
                    </span>
                    </div>

                    <div className="plan_wrapper">
                        <span className="plan_wrapper_text">
                        <span className={plan.done ? "done_text" : ""}>{plan.text}</span>
                        </span>
                        
                        <span className="button_checkbox">
                        <button className="delete_btn" onClick={() => deletePlan(plan.id)}>Delete</button>
                        <button className="status_btn" onClick={() => doneCheck(plan.id)}>Status</button>
                        </span>
                    </div>

                        <div className="status">
                        <span className={plan.done ? "visible" && "done_text" : "invisible"}>
                            Goal Achieved ✔
                            <p>{currentDate} ({currentTime})</p>
                        </span>
                        </div>
                    {/* I can also set the date of input. The time i set the plan so i can know how long i've been neglecting it. */}
                </li>
             )}
            </ul>

            <div className="clear_btn">
            {plans.length > 0 ? <button onClick={clearPlans}>Clear All</button> : null}
            </div>

        </div>
        </>
    );
}

export default TodoApp;