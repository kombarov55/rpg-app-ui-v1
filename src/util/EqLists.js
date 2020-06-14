export default function EqLists(xs1, xs2, test = (x1, x2) => x1 === x2) {
     console.log("eqlists:")
     console.log({xs1: xs1, xs2: xs2})
     return xs1.length === xs2.length && internal(xs1, xs2, test)
}

function internal(xs1, xs2, test) {
     if (xs1.length === 0 && xs2.length === 0) {
          return true
     }

     const x1 = xs1[0]
     const contains = xs2.indexOf(x2 => test(x1, x2))

     if (contains) {
          const xs1Sliced = xs1.filter(it => it !== x1)
          const xs2Sliced = xs2.filter(it => it !== x1)

          return internal(xs1Sliced, xs2Sliced)
     } else {
          return false
     }
}