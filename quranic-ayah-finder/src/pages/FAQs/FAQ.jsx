import { Accordion, AccordionTab } from 'primereact/accordion';

export default function FAQ() {
    let topics = Object.keys(faqs);

    return (
        <>
        <h1 className='w-[80%] m-auto my-6 text-2xl font-bold'>
            FAQ (Frequently Asked Questions)
        </h1>
        <p className="text-sm font-medium text-slate-500 my-1 mb-[5%] lg:mx-[20%] mx-4">
            Search Quranic verses through our one of a kind image search bar or explore Quranic content through one of our 
            comprehensive guides and quizzes. These FAQs will help you navigate the application by providing with a lot of information 
            to learn and test your knowledge with the quizzes that follow.
        </p> 

        <div className="card w-[80%] m-auto xl:text-xl lg:text-lg font-medium tracking-wide pb-6">
            {
                topics.map((topic,i) => 
                {
                    const topicFAQs = faqs[topic]
                    return (
                        <div className='text-slate-600 bg-custom-gray lg:p-10 p-4 shadow-md rounded flex flex-col my-10 text-left'>
                            <div className='mb-4'>
                                <h2>{topic}</h2>
                            </div>
                            <div>
                                <Accordion multiple activeIndex={[]}>
                                {
                                    topicFAQs.map((item,i) => (
                                        <AccordionTab key={i} header={item.question} className='mb-4'>
                                            <p className="m-0">
                                                {item.answer}
                                            </p>
                                        </AccordionTab>
                                    ))
                                }
                                </Accordion>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

// faq content
const faqs = {
    General : [
        {
            question : 'What is the Visual Quranic Ayah Finder?',
            answer: 'An application that cann allow users to search for a verse in the Holy Quran by either typing keywords or uploading an image of verse.'
        },
        {
            question : 'How can I access Visual Quranic Ayah Finder?',
            answer: 'The web application is easily accesbile on the browser. You can register to save searches in your accounts and discuss on the Forum.'
        },
        {
            question : 'Is Visual Quranic Ayah Finder free to use?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        },
        {
            question : 'Do I need to create an account to use Visual Quranic Ayah Finder?',
            answer: 'A user account is needed to add posts to the discussion forums, but is not required to access the search bar.'
        },
        {
            question : 'How can I contact the support team?',
            answer: 'You can write an email to us at support@outlook.com or reach out to us on our instagram page.'
        }
    ],
    'Quran Verse Search' : [
        {
            question : 'How can I search for Quran verses using images?',
            answer: 'An application that cann allow users to search for a verse in the Holy Quran by either typing keywords or uploading an image of verse.'
        },
        {
            question : 'What image formats are supported for verse search?',
            answer: 'The web application is easily accesbile on the browser. You can register to save searches in your accounts and discuss on the Forum.'
        },
        {
            question : 'How accurate is the image-based verse search?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        },
        {
            question : 'Can I search for verses in languages other than Arabic?',
            answer: 'A user account is needed to add posts to the discussion forums, but is not required to access the search bar.'
        },
        {
            question : 'Is there a limit to the number of verses I can search for in a day?',
            answer: 'You can write an email to us at support@outlook.com or reach out to us on our instagram page.'
        }
    ],
    'Text-Based Search' : [
        {
            question : 'How do I search for Quran verses using the search bar?',
            answer: 'An application that cann allow users to search for a verse in the Holy Quran by either typing keywords or uploading an image of verse.'
        },
        {
            question : 'Can I search for verses using translations or specific keywords?',
            answer: 'The web application is easily accesbile on the browser. You can register to save searches in your accounts and discuss on the Forum.'
        },
        {
            question : 'Are there any search tips or tricks for more accurate results?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        }
    ],
    'Discussion Forum' : [
        {
            question : 'How can I participate in the discussion forum?',
            answer: 'An application that cann allow users to search for a verse in the Holy Quran by either typing keywords or uploading an image of verse.'
        },
        {
            question : 'Are there any guidelines for posting in the forum?',
            answer: 'The web application is easily accesbile on the browser. You can register to save searches in your accounts and discuss on the Forum.'
        },
        {
            question : 'Can I ask questions or start new discussions?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        },
        {
            question : 'How do I report inappropriate content in the forum?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        }
    ],
    'Guides and Quizzes' : [
        {
            question : 'What types of guides and quizzes are available?',
            answer: 'An application that cann allow users to search for a verse in the Holy Quran by either typing keywords or uploading an image of verse.'
        },
        {
            question : 'How can I access the guides and quizzes?',
            answer: 'The web application is easily accesbile on the browser. You can register to save searches in your accounts and discuss on the Forum.'
        },
        {
            question : 'Are the guides and quizzes interactive?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        },
        {
            question : 'Can I track my progress in the quizzes?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        }
    ],
    'Account and Profile' : [
        {
            question : 'How can I create an account on Visual Quranic Ayah Finder?',
            answer: 'An application that cann allow users to search for a verse in the Holy Quran by either typing keywords or uploading an image of verse.'
        },
        {
            question : 'Can I change my profile information later?',
            answer: 'The web application is easily accesbile on the browser. You can register to save searches in your accounts and discuss on the Forum.'
        },
        {
            question : 'What should I do if I forget my password?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        },
        {
            question : 'How can I delete my account?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        }
    ],
    'Technical Issues' : [
        {
            question : "What should I do if I'm experiencing technical problems with the app?",
            answer: 'An application that cann allow users to search for a verse in the Holy Quran by either typing keywords or uploading an image of verse.'
        },
        {
            question : 'Is there a troubleshooting guide for common issues?',
            answer: 'The web application is easily accesbile on the browser. You can register to save searches in your accounts and discuss on the Forum.'
        },
        {
            question : "How do I clear my browser's cache and cookies?",
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        },
        {
            question : 'Does Visual Quranic Ayah Finder work on all devices and browsers?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        }
    ],
    'Privacy and Security' : [
        {
            question : 'How is my personal information used and stored?',
            answer: 'An application that cann allow users to search for a verse in the Holy Quran by either typing keywords or uploading an image of verse.'
        },
        {
            question : 'Is my data secure on Visual Quranic Ayah Finder?',
            answer: 'The web application is easily accesbile on the browser. You can register to save searches in your accounts and discuss on the Forum.'
        },
        {
            question : 'Do you share user data with third parties?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        },
        {
            question : 'What is your data retention policy?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        }
    ],
    'Payment and Subscriptions' : [
        {
            question : 'Is there a premium version of [Your App Name]?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        }
    ],
    'Copyright and Attribution' : [
        {
            question : 'How are Quranic verses and translations sourced on [Your App Name]?',
            answer: 'An application that cann allow users to search for a verse in the Holy Quran by either typing keywords or uploading an image of verse.'
        },
        {
            question : 'Do I need to provide attribution for using content from [Your App Name]?',
            answer: 'The web application is easily accesbile on the browser. You can register to save searches in your accounts and discuss on the Forum.'
        },
        {
            question : 'What measures do you take to ensure accurate and authentic content?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        },
        {
            question : 'What is your data retention policy?',
            answer: 'The Visual Quranic Ayah Finder is currently completely free to use as of now.'
        }
    ],
}