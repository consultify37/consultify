import Image from "next/image"
import Link from "next/link"

type Props = {
	node: any
}

const LinkFormatter = ({ node }: Props) => {
	return (
		<Link 
			href={node.attribs.href} 
			target="_blank" 
			className="text-[14px] md:text-[16px] text-primary underline hover:scale-105 transition-all"
		>
			{ node.type == 'text' ?
				node.children[0].data :
				<ElementFormatter node={node.children[0]} />
			}
		</Link>
	)
}

const ElementFormatter = ({ node }: Props) => {
	return (
		<span>
			{ node.type === 'tag' && node.name === 'a' &&
				<LinkFormatter node={node} />
			}
			{ node.type === 'tag' && node.name === 'em' &&
				<em>
					{ node.type == 'text' ?
						node.children[0].data :
						<ElementFormatter node={node.children[0]} />
					}
				</em>
			}
			{ node.type === 'tag' && node.name === 'strong' &&
				<strong>
					{ node.type == 'text' ?
						node.children[0].data :
						<ElementFormatter node={node.children[0]} />
					}
				</strong>
			}
			{ node.type === 'text' &&
				node.data
			}
		</span>
	)
} 

export const formatter = (node: any, index: number) => {

  if (node.type === 'tag' && node.name === 'img') {
		return (
			<Image 
				key={node.attribs.src}
				src={node.attribs.src}
				width={512}
				height={512}
				alt='image'
				unoptimized={true}
				className="w-full h-auto rounded-3xl mt-6 md:mt-8"
			/>
		)
  } if (node.type === 'tag' && node.name === 'p' && node.children[0].type === 'tag' && node.children[0].name === 'img') {
		return (
			<Image 
				key={node.children[0].attribs.src}
				src={node.children[0].attribs.src}
				width={512}
				height={512}
				alt='image'
				unoptimized={true}
				className="w-full h-auto rounded-3xl mt-2 md:mt-8"
			/>
		)
	} else if (node.type === 'tag' && node.name === 'h2') {     
		return (
			<h2
				key={index}
				className="text-[22px] md:text-[24px] font-semibold"
			>
				{ node.children[0].type === 'text' ?
					node.children[0].data :
					node.children[0].children[0].data
				}
			</h2>
		)
  } else if (node.type === 'tag' && node.name === 'h1') {     
		return (
			<h1
				key={index}
				className="text-[26px] md:text-[28px] font-semibold"
			>
				{ 
					node.children[0].type === 'text' ?
					node.children[0].data :
					node.children[0].children[0].data
				}
			</h1>
		)
  } else if (node.type === 'tag' && node.name === 'h3') {     
		console.log(node)
		return (
			<h3
				key={index}
				className="text-[18px] md:text-[20px] font-semibold"
			>
				{ 
					node.children[0].type === 'text' ?
					node.children[0].data :
					node.children[0].children[0].data
				}
			</h3>
		)
  } else if (node.type === 'tag' && node.name === 'p'  ) {
		return (
			<p className="text-[14px] md:text-[16px]" key={index}>
				{ node.children.length != 0 && node.children.map((node: any, index: number) => (
						<ElementFormatter node={node} key={index} />
				))}
			</p>
		)
	} else if (node.type === 'tag' && node.name === 'ul'  ) {
		return (
			<ul className="list-disc ml-4 -mt-1" key={index}>
				{ node.children.map((node: any, index: number) => (
					<li className="text-[14px] md:text-[16px] mt-1" key={index}>
						{ node.children.length != 0 && node.children.map((node: any, index: number) => (
								<ElementFormatter node={node} key={index} />
						))}
					</li>
				)) }
			</ul>
		)
	} else if (node.type === 'tag' && node.name === 'ol'  ) {
		return (
			<ol className="list-decimal ml-4 -mt-1" key={index}>
				{ node.children.map((node: any, index: number) => (
					<li className="text-[14px] md:text-[16px] mt-1" key={index}>
						{ node.children.length != 0 && node.children.map((node: any, index: number) => (
								<ElementFormatter node={node} key={index} />
						))}
					</li>
				)) }
			</ol>
		)
	}
}