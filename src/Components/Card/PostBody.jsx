import { Modal, ModalContent, ModalBody, useDisclosure } from '@heroui/react'

export default function PostBody({ body, image }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return <>
        {body && <p className='mb-3'>{body}</p>}
        {image && (
            <>
                <img
                    src={image}
                    className='w-full max-h-96 object-contain cursor-pointer hover:opacity-90 transition-opacity'
                    alt=""
                    onClick={onOpen}
                />
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size="5xl"
                    backdrop="blur"
                    placement="center"
                    classNames={{
                        base: "max-h-[90vh]",
                        body: "p-0"
                    }}
                >
                    <ModalContent>
                        <ModalBody>
                            <div className="relative">
                                <img
                                    src={image}
                                    className='w-full h-auto object-contain max-h-[85vh]'
                                    alt=""
                                />
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
        )}
    </>
}