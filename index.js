const express = require('express')
const shortid = require('shortid')

const server = express()

server.use(express.json())

const PORT = process.env.PORT || 5000

let channels = []
let lessons = []

server.get('/', (req, res) => {
  return res.status(200).json({ hello: 'world' })
})

server.get('/hello', (req, res) => {
  return res.status(200).json({ hello: 'bro' })
})

// CHANNELS
// GET all channels
server.get('/api/channels', (req, res) => {
  return res.status(200).json(channels)
})

// GET single channel
server.get('/api/channels/:id', (req, res) => {
  const { id } = req.params
  const found = channels.find((channel) => channel.id === id)

  if (found) {
    return res.status(200).json(found)
  } else {
    return res.status(404).json({ message: 'Record not found' })
  }
})

// POST
server.post('/api/channels', (req, res) => {
  const channelInfo = req.body
  channelInfo.id = shortid.generate()

  channels.push(channelInfo)

  return res.status(201).json(channelInfo)
})

// PUT single channel
server.put('/api/channels/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body
  const index = channels.findIndex((channel) => channel.id === id)

  if (index != -1) {
    channels[index] = changes
    return res.status(200).json(channels[index])
  } else {
    return res.status(404).json({ message: 'Record not found' })
  }
})

// PATCH single channel
server.patch('/api/channels/:id', (req, res) => {
  const { id } = req.params
  changes = req.body

  const found = channels.find((channel) => channel.id === id)

  if (found) {
      Object.assign(found, changes)
      return res.status(200).json(found)
  } else {
    return res.status(404).json({ message: 'Record not found' })
  }
})

// DELETE
server.delete('/api/channels/:id', (req, res) => {
  const { id } = req.params

  const deleted = channels.find((channel) => channel.id === id)
  if (deleted) {
    channels = channels.filter((channel) => channel.id != id)

    return res.status(200).json(channels)
  } else {
    res.status(404).json({ message: 'Record not found' })
  }
})

// LESSONS
// GET
server.get('/api/lessons', (req, res) => {
  return res.status(200).json(lessons)
})

// GET single lesson
server.get('/api/lessons/:id', (req, res) => {
  const { id } = req.params
  const found = lessons.find((lesson) => lesson.id === id)

  if (found) {
    return res.status(200).json(found)
  } else {
    return res.status(404).json({ message: 'Record not found' })
  }
})

// POST
server.post('/api/lessons', (req, res) => {
  const lessonInfo = req.body
  lessonInfo.id = shortid.generate()

  lessons.push(lessonInfo)

  return res.status(201).json(lessonInfo)
})

// PUT single lesson
server.put('/api/lessons/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body
  const index = lessons.findIndex((lesson) => lesson.id === id)

  if (index != -1) {
    lessons[index] = changes
    return res.status(200).json(lessons[index])
  } else {
    return res.status(404).json({ message: 'Record not found' })
  }
})

// PATCH single lesson
server.patch('/api/lessons/:id', (req, res) => {
    const { id } = req.params
    changes = req.body
  
    const found = lessons.find((lesson) => lesson.id === id)
  
    if (found) {
        Object.assign(found, changes)
        return res.status(200).json(found)
    } else {
      return res.status(404).json({ message: 'Record not found' })
    }
  })

// DELETE
server.delete('/api/lessons/:id', (req, res) => {
  const { id } = req.params

  const deleted = lessons.find((lesson) => lesson.id === id)
  if (deleted) {
    lessons = lessons.filter((lesson) => lesson.id != id)

    return res.status(200).json(lessons)
  } else {
    return res.status(404).json({ message: 'Record not found' })
  }
})

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})
