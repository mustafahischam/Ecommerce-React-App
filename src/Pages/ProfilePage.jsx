import React from 'react'
import { Button } from '@heroui/react'
import PostCard from '../Components/PostCard'
import { getUserPostsApi } from '../Services/postService'
import { useState, useEffect, useContext, useRef } from 'react'
import LoadingScreen from '../Components/LoadingScreen'
import CreatePost from '../Components/CreatePost'
import { AuthContext } from '../Context/AuthContext'
import { Card, CardBody, User as HeroUser, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input as HeroInput } from '@heroui/react'
import { updateUserPhotoApi, getUserDataApi, changePasswordApi } from '../Services/authServices'
import * as zod from 'zod'
import { schema as registerSchema } from '../Schema/registerSchema'

export default function ProfilePage() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const { userData, setUserData } = useContext(AuthContext)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const [pwdOpen, setPwdOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwdError, setPwdError] = useState(null)
  const [pwdSuccess, setPwdSuccess] = useState(null)

  // Build change-password validation schema using existing password rules
  const changePwdSchema = zod.object({
    currentPassword: zod.string().nonempty('Current password is required'),
    newPassword: registerSchema.shape.password,
    confirmPassword: zod.string().nonempty('Please confirm your new password')
  }).refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match'
  })

  async function getUserPosts() {
    if (!userData?._id) return
    setLoading(true)
    const response = await getUserPostsApi(userData._id, { limit: 100 })
    const list = Array.isArray(response?.posts) ? response.posts : []
    const sorted = list.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    setPosts(sorted)
    setLoading(false)
  }

  useEffect(() => {
    getUserPosts()
  }, [userData])

  const formattedDob = userData?.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : '—'

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('photo', file)
    const response = await updateUserPhotoApi(formData)
    if (response?.message === 'success') {
      const fresh = await getUserDataApi()
      if (fresh?.message === 'success' && setUserData) {
        setUserData(fresh.user)
      }
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function submitPasswordChange(e) {
    e.preventDefault()
    setPwdError(null)
    setPwdSuccess(null)

    const parsed = changePwdSchema.safeParse({ currentPassword, newPassword, confirmPassword })
    if (!parsed.success) {
      const first = parsed.error.issues?.[0]
      setPwdError(first?.message || 'Validation failed')
      return
    }

    setUploading(true)
    const response = await changePasswordApi({ currentPassword, newPassword, confirmPassword })
    if (response?.message === 'success') {
      setPwdSuccess('Password updated successfully.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      setPwdError(response?.error || response?.message || 'Something went wrong')
    }
    setUploading(false)
  }

  return <>

    <div className="w-4/6 mx-auto">

      {userData && (
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <HeroUser
                  name={userData.name}
                  description={userData.email}
                  avatarProps={{ src: userData.photo, radius: 'full' }}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  id="profile-photo-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <Button size="sm" color="default" onPress={() => setPwdOpen(true)}>Change Password</Button>
                <Button size="sm" color="primary" isLoading={uploading} onPress={() => fileInputRef.current?.click()}>
                  Change Photo
                </Button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium break-all">{userData.email}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Gender</p>
                <p className="font-medium capitalize">{userData.gender}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Date of Birth</p>
                <p className="font-medium">{formattedDob}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      <CreatePost callBack={async () => { await getUserPosts() }} onCreated={(newPost) => setPosts((prev) => [newPost, ...prev])} />

      {loading ? (
        <LoadingScreen />
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 py-6">No posts yet</div>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} commentLimit={1} callBack={getUserPosts} />
        ))
      )}

    </div>

    <Modal isOpen={pwdOpen} onOpenChange={setPwdOpen} placement="center">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={submitPasswordChange}>
            <ModalHeader className="flex flex-col gap-1">Change Password</ModalHeader>
            <ModalBody>
              {pwdError && <div className="text-red-600 text-sm">{pwdError}</div>}
              {pwdSuccess && <div className="text-green-600 text-sm">{pwdSuccess}</div>}
              <HeroInput
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                isRequired
                variant="bordered"
              />
              <HeroInput
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                isRequired
                variant="bordered"
              />
              <HeroInput
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isRequired
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>Close</Button>
              <Button color="primary" type="submit" isLoading={uploading}>Save</Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>

  </>
}