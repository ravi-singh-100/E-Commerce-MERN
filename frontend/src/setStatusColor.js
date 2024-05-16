const setStatusColor=(color)=>{
    // console.log('colot is ',color)
switch(color){
    
    case 'ordered': return ` text-blue-900`
 
    case 'dispatched': return ` text-yellow-400`
    
    case 'delivered':return ` text-green-600`
   
    case 'cancelled':return ` text-red-900`
}
}
export default setStatusColor
