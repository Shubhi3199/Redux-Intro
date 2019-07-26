console.clear();
// PEople Submitting Form(Action Creator)

const createPolicy=(name, amount)=>{
  return{        //Object returned by Action Creator=> Action
    type:'CREATE_POLICY',
    payload:{
      name:name,
      amount:amount
    }
  }
}

const deletePolicy=(name)=>{
  return{
    type:'DELETE_POLICY',
    payload:{
      name:name
    }
  }
}

const createClaim=(name,claim_amount)=>{
  return{
    type:'CREATE_CLAIM',
    payload:{
      name:name,
      claim_amount:claim_amount
    }
  }
}

//Reducers (analogus to our Departments)
const claimsHistory=(oldListOfClaims=[], action)=>{
  if(action.type=='CREATE_CLAIM'){
    //update the oldListOfClaims
    //Always use a spread opearator inside a reducer instead of using a push method
    return [...oldListOfClaims, action.payload]
  }
  //Don't update the list.
  return oldListOfClaims
}

const accounting=(bagOfMoney=100, action)=>{
  if(action.type=='CREATE_CLAIM'){
    
    // Subtract the claim amount and return the bagOfMoney to the main repo
    bagOfMoney -= action.payload.claim_amount;
    return bagOfMoney;
  }
  else if(action.type=='CREATE_POLICY'){
    bagOfMoney += action.payload.amount;
    return bagOfMoney;
  }
  else return bagOfMoney;
}

const policies=(listOfPolicies=[], action)=>{
  if(action.type=='CREATE_POLICY'){
    return [...listOfPolicies, action.payload.name];
 }
  else if(action.type=='DELETE_TYPE'){
    return listOfPolicies.filter((name)=>{
      name!==action.payload.name
    });
  }
  else return listOfPolicies;
}

const {createStore, combineReducers}=Redux;
const ourDepartments=combineReducers({
  accounting:accounting,
  policies:policies,
  claimsHistory:claimsHistory
});
const store=createStore(ourDepartments);

const action=createPolicy('Alex', 20);
const action2=createPolicy('Jin', 10);
const action3=createPolicy('codo', 40);
const action4=createClaim('Alex', 50);
store.dispatch(action);
store.dispatch(action2);
store.dispatch(action3);
store.dispatch(action4);
store.dispatch(createClaim('Shubham',10));
console.log(store.getState());
