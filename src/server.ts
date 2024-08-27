import { Hono } from 'hono'
import {poweredBy} from 'hono/powered-by'
import {logger} from "hono/logger"
import dbConnect from './DB/connect'
import routes from './routes';


const app = new Hono()

// 
app.use(poweredBy())
app.use(logger())

app.route('/api', routes);


dbConnect()
  .then()
  .catch((err) =>{
    app.get('/*', (c) => {
      return c.text(`Failed to connect mongodb: ${err.message}`)
    })
  })

app.onError((err, c) =>{
  return c.text(`App Error: ${err.message}`)
})

export default app
