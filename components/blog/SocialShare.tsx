'use client'

import { 
  TwitterShareButton, 
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'next-share'

interface SocialShareProps {
  url: string
  title: string
  description: string
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <TwitterShareButton
        url={url}
        title={title}
        via="finfitblog"
        hashtags={['personalFinance', 'fitness', 'blog']}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <FacebookShareButton
        url={url}
        quote={description}
        hashtag="#FinFitBlog"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <LinkedinShareButton
        url={url}
        title={title}
        summary={description}
        source="FinFit Blog"
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <WhatsappShareButton
        url={url}
        title={title}
        separator=":: "
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  )
}