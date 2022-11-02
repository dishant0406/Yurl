//controller function

import URL from '../Schema/URLSchema.js'
import generate from 'meaningful-string'

const ShortUrlandStore = async (req, res) => {
  const { url } = req.body
  var options = {
    "charLength": 6,
  }

  const shortedURl = await URL.findOne({ original_url: url })

  if (shortedURl) {
    res.json(shortedURl)
  } else {
    const short_url = generate.shortId(options)
    const newURL = new URL({
      original_url: url,
      short_url: short_url
    })
    const savedURL = await newURL.save()
    res.status(201).json(savedURL)
  }

}

const findUrlAndSend = async (req, res) => {
  const { url } = req.body

  const shortedURl = await URL.findOne({ short_url: url })

  if (shortedURl) {
    res.json(shortedURl)
  } else {
    res.json({ error: "No URL Found" })
  }

}

export { ShortUrlandStore, findUrlAndSend }

