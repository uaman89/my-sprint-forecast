// import dataset from 'dataset';

const dataset = [
  { planned: 40, actual: 48, previous: 0, daysInSprint: 10, teamSize: 6, feTeamSize: 2, beTeamSize: 4, teamVelocity: 50, success: true },

  { planned: 36, actual: 43, previous: 48, daysInSprint: 9, teamSize: 6, feTeamSize: 2, beTeamSize: 4, teamVelocity: 43, success: true },
  { planned: 44, actual: 24, previous: 43, daysInSprint: 9, teamSize: 4, feTeamSize: 1, beTeamSize: 3, teamVelocity: 36, success: false },
  { planned: 29, actual: 40, previous: 24, daysInSprint: 10, teamSize: 3, feTeamSize: 1, beTeamSize: 2, teamVelocity: 24, success: true },
  { planned: 22, actual: 11, previous: 40, daysInSprint: 10, teamSize: 3, feTeamSize: 1, beTeamSize: 2, teamVelocity: 23, success: false },
  { planned: 41, actual: 30, previous: 11, daysInSprint: 10, teamSize: 7, feTeamSize: 3, beTeamSize: 4, teamVelocity: 53, success: true },
  { planned: 35, actual: 45, previous: 30, daysInSprint: 9, teamSize: 7, feTeamSize: 3, beTeamSize: 4, teamVelocity: 50, success: true }, //7
  { planned: 36, actual: 27, previous: 45, daysInSprint: 10, teamSize: 6, feTeamSize: 2, beTeamSize: 4, teamVelocity: 40, success: false }, //8
  { planned: 26, actual: 13, previous: 27, daysInSprint: 10, teamSize: 5, feTeamSize: 2, beTeamSize: 3, teamVelocity: 40, success: false }, //9

  { planned: 26, actual: 0, previous: 13, daysInSprint: 10, teamSize: 5, feTeamSize: 2, beTeamSize: 3, teamVelocity: 50, success: '?' }, //10
];

// provide optional config object (or undefined). Defaults shown.
 const config = {
     binaryThresh: 0.5, // ¯\_(ツ)_/¯
     hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
     activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
};
  
// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork();

const normalisedData = dataset.map(sprint => {
  const input = Object.keys(sprint).filter(key => key!== 'success' && key !== 'previous').map(key => sprint[key]);
  const output = [sprint.success ? 1 : 0];
  return {input, output}
});
console.log("normalisedData:",normalisedData);


const trainData = normalisedData.slice(1,-1);
    
console.log("trainData:", trainData);

net.train(trainData);
  

let sprint, output;

sprint = normalisedData.slice(2,3)[0];
output = net.run(sprint.input);
console.log('sprint 3:', sprint, 'success:', sprint.output);
console.log("prediction", output);

sprint = normalisedData.slice(3,4)[0];
output = net.run(sprint.input);
console.log('sprint 4:', sprint, 'success:', sprint.output);
console.log("prediction", output);

sprint = normalisedData.slice(6,7)[0];
output = net.run(sprint.input);
console.log('sprint 7:', sprint, 'success:', sprint.output);
console.log("prediction", output);


sprint = normalisedData.slice(8,9)[0];
output = net.run(sprint.input);
console.log('sprint 9:', sprint, 'success:', sprint.output);
console.log("prediction", output);

sprint = normalisedData.slice(9,10)[0];
output = net.run(sprint.input);
console.log('!!! sprint 10:', sprint, 'success:', sprint.output);
console.log("prediction", output,);
