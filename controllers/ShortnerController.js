//controller function

import URL from '../Schema/URLSchema.js'
import generate from 'meaningful-string'

function isValidUrl(url) {
  const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return pattern.test(url);
}

const ShortUrlandStore = async (req, res) => {
  const { url, shorturl } = req.query
  var options = {
    "charLength": 6,
  }

  if (!isValidUrl(url)) {
    res.json({ error: "Invalid URL" })
    return
  }

  const shortedURl = await URL.findOne({ original_url: url })

  if (shortedURl) {
    res.json({
      original_url: shortedURl.original_url,
      short_url: shortedURl.short_url
    })
  } else {
    const short_url = generate.shortId(options)

    if (shorturl) {
      const checkShort = await URL.findOne({ short_url: shorturl })

      if (checkShort) {
        res.send({ error: "Short URL already exists" })
        return
      } else {
        const newURL = new URL({
          original_url: url,
          short_url: shorturl
        })
        const savedURL = await newURL.save()
        return res.status(201).json({
          original_url: savedURL.original_url,
          short_url: savedURL.short_url
        })

      }
    }
    const newURL = new URL({
      original_url: url,
      short_url: short_url
    })
    const savedURL = await newURL.save()
    res.status(201).json({
      original_url: savedURL.original_url,
      short_url: savedURL.short_url
    })
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

const formatURL = (url) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return 'http://' + url
}

const forwardToOriginalUrl = async (req, res) => {
  const { url } = req.params

  const shortedURl = await URL.findOne({ short_url: url })

  if (shortedURl) {
    const original_url = shortedURl.original_url

    res.redirect(formatURL(original_url))
  } else {
    res.json({ error: "No URL Found" })
  }

}

const getAllUrls = async (req, res) => {
  const urls = await URL.find({})
  res.json(urls)
}


export { getAllUrls, ShortUrlandStore, findUrlAndSend, forwardToOriginalUrl }

