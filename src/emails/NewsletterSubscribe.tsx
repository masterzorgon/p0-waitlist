import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
	Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

const NewsletterSubscribe = () => {
	const previewText = "Welcome to the Project 0 Newsletter!";

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Section className="mt-[32px] w-full text-center">
							<Link href="https://0.xyz" title="Project 0 Website">
								<Img src="/logo-type.png" alt="Project 0 Logo" width={30} height={30} style={{
                                    display: 'block',
                                    margin: '0 auto',
                                    border: '0',
                                    outline: 'none',
                                    textDecoration: 'none'
                                }} />
							</Link>
						</Section>
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[10px] mx-0">
							Welcome to the Project 0 Newsletter!
						</Heading>
						<Text className="text-black text-[14px] leading-[24px] text-center">
							We thank you for choosing to signup for our newsletter and stay up to date with our latest updates.
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								className="bg-black rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href="https://0.xyz"
							>
								Launch Project 0
							</Button>
						</Section>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							If you were not expecting this invitation, you can ignore this email. If
							you are concerned about your account&apos;s safety, please reply to
							this email or email support@0.xyz to get in touch with us.
							If you would like to unsubscribe from our email list, please do so on our website: https://blog.0.xyz/unsubscribe
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default NewsletterSubscribe;
