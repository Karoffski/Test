// x = 1652372488

// let time = new Date(x * 1000).toUTCString().slice(-11, -4);

// console.log(time)

x = '09:59:45 PM'
x = parseInt(x.slice(0, -3).replace(':', '').replace(':', ''))
x = x + 120000
console.log(x)