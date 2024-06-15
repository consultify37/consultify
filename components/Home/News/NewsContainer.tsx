import NewsItem from "./NewsItem"
import { Article } from "../../../types"

type Props = {
    cardRef: React.RefObject<HTMLElement>
    carouselRef: React.RefObject<HTMLDivElement>
    articles: Article[]
}

const NewsContainer = ({cardRef, carouselRef, articles}: Props) => {
    return(
        <div className='flex gap-4 mt-5 overflow-x-auto w-full scrollbar-none items-stretch pb-4' ref={carouselRef}>
            {
                articles.map((article, index) =>
                    <div 
                        key={article.id}
                        className={index == 0 ? "pl-7 md:pl-[80px] xl:pl-[140px] 2xl:pl-[276px]" : ( index == articles.length - 1 ? "pr-4" : "" )}
                    >
                        <NewsItem cardRef={cardRef} article={article} /> 
                    </div>   
                )
            }
        </div>
    )
}
export default NewsContainer