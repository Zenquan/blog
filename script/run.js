const shelljs = require('shelljs')


async function __main__() {
  try {
      console.log('运行')
      shelljs.exec(`
        npm run server:prod
      `)
  } catch (err) {
    console.log('运行失败')
    console.error(err)
  }
}

__main__()