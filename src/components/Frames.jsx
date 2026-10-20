export function BrowserFrame({ src, url, alt }) {
  return (
    <div className="bframe">
      <div className="bframe-bar">
        <i />
        <i />
        <i />
        <span>{url}</span>
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" width="1440" height="900" />
    </div>
  )
}

export function PhoneFrame({ src, alt }) {
  return (
    <div className="pframe">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  )
}

export function Shot({ item, alt }) {
  return item.kind === 'phone' ? <PhoneFrame src={item.src} alt={alt || item.caption} /> : <BrowserFrame src={item.src} url={item.url} alt={alt || item.caption} />
}
