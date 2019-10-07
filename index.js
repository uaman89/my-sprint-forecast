// import dataset from 'dataset';

const datasetX = [
    { planned: 40, actual: 48, previous: 40, previousDiff: 0, daysInSprint: 10, teamSize: 6, feTeamSize: 2, beTeamSize: 4, teamVelocity: 50, success: true },

    { planned: 36, actual: 43, previous: 48, previousDiff: (48-40), daysInSprint: 9, teamSize: 6, feTeamSize: 2, beTeamSize: 4, teamVelocity: 43, success: true },   //2
    { planned: 44, actual: 24, previous: 43, previousDiff: (43-36), daysInSprint: 9, teamSize: 4, feTeamSize: 1, beTeamSize: 3, teamVelocity: 36, success: false },  //3
    { planned: 29, actual: 40, previous: 24, previousDiff: (24-44), daysInSprint: 10, teamSize: 3, feTeamSize: 1, beTeamSize: 2, teamVelocity: 24, success: true },  //4
    { planned: 22, actual: 11, previous: 40, previousDiff: (40-29), daysInSprint: 10, teamSize: 3, feTeamSize: 1, beTeamSize: 2, teamVelocity: 23, success: false }, //5
    { planned: 41, actual: 30, previous: 11, previousDiff: (11-22), daysInSprint: 10, teamSize: 7, feTeamSize: 3, beTeamSize: 4, teamVelocity: 53, success: true },  //6
    { planned: 35, actual: 45, previous: 30, previousDiff: (30-41), daysInSprint: 9, teamSize: 7, feTeamSize: 3, beTeamSize: 4, teamVelocity: 50, success: true },   //7
    { planned: 36, actual: 27, previous: 45, previousDiff: (45-35), daysInSprint: 10, teamSize: 6, feTeamSize: 2, beTeamSize: 4, teamVelocity: 40, success: false }, //8
    { planned: 26, actual: 13, previous: 27, previousDiff: (27-36), daysInSprint: 10, teamSize: 5, feTeamSize: 2, beTeamSize: 3, teamVelocity: 40, success: false }, //9

    { planned: 26, actual:  null, previous: 13, previousDiff: (13-26), daysInSprint: 10, teamSize: 5, feTeamSize: 2, beTeamSize: 3, teamVelocity: 50, success: null }, //10
];

// provide optional config object (or undefined). Defaults shown.
//  const config = {
//      binaryThresh: 0.4, // ¯\_(ツ)_/¯
//      hiddenLayers: [2], // array of ints for the sizes of the hidden layers in the network
//      activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
// };
  
// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork();

// const normalisedData = dataset.map(sprint => {
//   const input = Object.keys(sprint).filter(key => key!== 'success' && key !== 'previous').map(key => sprint[key]);
//   const output = [sprint.success ? 1 : 0];
//   return {input, output}
// });
// console.log("normalisedData:",normalisedData);

const normalisedData = datasetX.map(sprint => {
  const input = Object.keys(sprint).filter(key => !['success', 'actual'].includes(key)).map(key => sprint[key]/100);
  // const output = [sprint.actual / 100];
  const output = [sprint.success? 1 : 0, sprint.actual/100];
  return {input, output}
});
console.log("normalisedData:",normalisedData);


const trainData = normalisedData.slice(1,-1);
    
console.log("trainData:", trainData);

function train(){
    net.train(trainData);
}



function predict(){
    normalisedData.forEach((sprint,index)=>{
        const output = net.run(sprint.input);
        console.log(`sprint ${index+1}:`, sprint, 'output:', sprint.output);
        console.log("prediction", output);
    });
}

train();
predict();
