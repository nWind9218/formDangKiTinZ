
import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
  Alert,
  Container,
  Grid,
  Divider,
  CircularProgress,
  Chip,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import {
  Person,
  CalendarToday,
  Email,
  Phone,
  Business,
  MenuBook,
  Language,
  LocationOn,
  CheckCircle,
  Error,
  Send,
} from "@mui/icons-material"

const GradientCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[10],
}))

const GradientCardHeader = styled(CardHeader)(({ theme }) => ({
  background: "linear-gradient(135deg, #2563eb 0%, #6366f1 100%)",
  color: "white",
  textAlign: "center",
  "& .MuiCardHeader-title": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
    fontWeight: "bold",
  },
  "& .MuiCardHeader-subheader": {
    color: "#bfdbfe",
  },
}))

const SectionTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  fontSize: "1.125rem",
  fontWeight: 600,
  color: "#1f2937",
  marginBottom: theme.spacing(3),
}))

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #2563eb 0%, #6366f1 100%)",
  color: "white",
  fontWeight: 600,
  padding: "12px 0",
  borderRadius: "8px",
  boxShadow: theme.shadows[4],
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)",
    boxShadow: theme.shadows[8],
    transform: "scale(1.02)",
  },
  "&:disabled": {
    background: "#9ca3af",
    color: "white",
  },
}))

const SuccessCard = styled(Card)(() => ({
  textAlign: "center",
  maxWidth: "400px",
  margin: "0 auto",
}))

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    gender: "",
    fullName: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    idNumber: "",
    email: "",
    phone: "",
    organization: "",
    subjects: [],
    version: "",
    language: "",
    area: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính"
    if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ và tên"
    if (!formData.birthDay) newErrors.birthDay = "Vui lòng nhập ngày sinh"
    if (!formData.birthMonth) newErrors.birthMonth = "Vui lòng nhập tháng sinh"
    if (!formData.birthYear) newErrors.birthYear = "Vui lòng nhập năm sinh"
    if (!formData.idNumber.trim()) newErrors.idNumber = "Vui lòng nhập số CMND/CCCD/Hộ chiếu"
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email"
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại"
    if (!formData.organization.trim()) newErrors.organization = "Vui lòng nhập trường học/đơn vị công tác"
    if (formData.subjects.length === 0) newErrors.subjects = "Vui lòng chọn ít nhất một môn thi"
    if (!formData.version) newErrors.version = "Vui lòng chọn phiên bản MOS"
    if (!formData.language) newErrors.language = "Vui lòng chọn ngôn ngữ thi"
    if (!formData.area) newErrors.area = "Vui lòng chọn khu vực thi"

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (formData.phone && !/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    }

    const day = Number.parseInt(formData.birthDay)
    const month = Number.parseInt(formData.birthMonth)
    const year = Number.parseInt(formData.birthYear)

    if (formData.birthDay && (day < 1 || day > 31)) {
      newErrors.birthDay = "Ngày sinh không hợp lệ (1-31)"
    }
    if (formData.birthMonth && (month < 1 || month > 12)) {
      newErrors.birthMonth = "Tháng sinh không hợp lệ (1-12)"
    }
    if (formData.birthYear && (year < 1900 || year > 2099)) {
      newErrors.birthYear = "Năm sinh không hợp lệ (1900-2099)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubjectChange = (subject, checked) => {
    setFormData((prev) => ({
      ...prev,
      subjects: checked ? [...prev.subjects, subject] : prev.subjects.filter((s) => s !== subject),
    }))
    if (errors.subjects) {
      setErrors((prev) => ({ ...prev, subjects: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        gender: "",
        fullName: "",
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        idNumber: "",
        email: "",
        phone: "",
        organization: "",
        subjects: [],
        version: "",
        language: "",
        area: "",
      })
      setIsSubmitted(false)
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <SuccessCard>
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                backgroundColor: "#dcfce7",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <CheckCircle sx={{ fontSize: 32, color: "#16a34a" }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#166534", mb: 1 }}>
              Đăng ký thành công!
            </Typography>
            <Typography sx={{ color: "#16a34a", mb: 2 }}>
              Cảm ơn bạn đã đăng ký. Vui lòng kiểm tra email để xác nhận thông tin.
            </Typography>
            <Chip label="Thông tin đã được gửi đi" sx={{ backgroundColor: "#dcfce7", color: "#166534" }} />
          </CardContent>
        </SuccessCard>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #f3e8ff 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <GradientCard>
          <GradientCardHeader
            title={
              <>
                <MenuBook />
                Đăng Ký Thi MOS
              </>
            }
            subheader="Vui lòng điền đầy đủ thông tin để hoàn tất đăng ký"
          />

          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
              {/* Personal Information */}
              <Box sx={{ mb: 4 }}>
                <SectionTitle>
                  <Person sx={{ color: "#2563eb" }} />
                  Thông tin cá nhân
                </SectionTitle>

                {/* Gender */}
                <FormControl component="fieldset" sx={{ mb: 3 }} error={!!errors.gender}>
                  <FormLabel component="legend" sx={{ fontWeight: 500, mb: 1 }}>
                    Giới tính *
                  </FormLabel>
                  <RadioGroup row value={formData.gender} onChange={(e) => handleInputChange("gender", e.target.value)}>
                    <FormControlLabel value="M" control={<Radio />} label="Nam" />
                    <FormControlLabel value="F" control={<Radio />} label="Nữ" />
                  </RadioGroup>
                  {errors.gender && (
                    <Alert severity="error" sx={{ mt: 1, py: 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Error sx={{ fontSize: 16 }} />
                        {errors.gender}
                      </Box>
                    </Alert>
                  )}
                </FormControl>

                {/* Full Name */}
                <TextField
                  fullWidth
                  label="Họ và tên *"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  sx={{ mb: 3 }}
                  placeholder="Nhập họ và tên đầy đủ"
                />

                {/* Birth Date */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday sx={{ fontSize: 16 }} />
                    Ngày sinh *
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Ngày"
                        inputProps={{ min: 1, max: 31 }}
                        value={formData.birthDay}
                        onChange={(e) => handleInputChange("birthDay", e.target.value)}
                        error={!!errors.birthDay}
                        helperText={errors.birthDay}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Tháng"
                        inputProps={{ min: 1, max: 12 }}
                        value={formData.birthMonth}
                        onChange={(e) => handleInputChange("birthMonth", e.target.value)}
                        error={!!errors.birthMonth}
                        helperText={errors.birthMonth}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Năm"
                        inputProps={{ min: 1900, max: 2099 }}
                        value={formData.birthYear}
                        onChange={(e) => handleInputChange("birthYear", e.target.value)}
                        error={!!errors.birthYear}
                        helperText={errors.birthYear}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* ID Number */}
                <TextField
                  fullWidth
                  label="Số CMND/CCCD/Hộ chiếu *"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  error={!!errors.idNumber}
                  helperText={errors.idNumber}
                  sx={{ mb: 3 }}
                  placeholder="Nhập số giấy tờ tùy thân"
                />
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Contact Information */}
              <Box sx={{ mb: 4 }}>
                <SectionTitle>
                  <Email sx={{ color: "#2563eb" }} />
                  Thông tin liên hệ
                </SectionTitle>

                {/* Email */}
                <TextField
                  fullWidth
                  type="email"
                  label="Email *"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ mb: 3 }}
                  placeholder="example@email.com"
                />

                {/* Phone */}
                <TextField
                  fullWidth
                  label="Số điện thoại *"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  sx={{ mb: 3 }}
                  placeholder="0123456789"
                  InputProps={{
                    startAdornment: <Phone sx={{ color: "#6b7280", mr: 1 }} />,
                  }}
                />

                {/* Organization */}
                <TextField
                  fullWidth
                  label="Trường học/Đơn vị công tác *"
                  value={formData.organization}
                  onChange={(e) => handleInputChange("organization", e.target.value)}
                  error={!!errors.organization}
                  helperText={errors.organization || "Theo công văn của IIG..."}
                  sx={{ mb: 3 }}
                  placeholder="Nhập tên trường học hoặc đơn vị công tác"
                  InputProps={{
                    startAdornment: <Business sx={{ color: "#6b7280", mr: 1 }} />,
                  }}
                />
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Exam Information */}
              <Box sx={{ mb: 4 }}>
                <SectionTitle>
                  <MenuBook sx={{ color: "#2563eb" }} />
                  Thông tin thi
                </SectionTitle>

                {/* Subjects */}
                <FormControl component="fieldset" sx={{ mb: 3 }} error={!!errors.subjects}>
                  <FormLabel component="legend" sx={{ fontWeight: 500, mb: 1 }}>
                    Môn thi muốn đăng ký *
                  </FormLabel>
                  <FormGroup>
                    {[
                      { value: "W", label: "Word" },
                      { value: "E", label: "Excel" },
                      { value: "PP", label: "PowerPoint" },
                    ].map((subject) => (
                      <FormControlLabel
                        key={subject.value}
                        control={
                          <Checkbox
                            checked={formData.subjects.includes(subject.value)}
                            onChange={(e) => handleSubjectChange(subject.value, e.target.checked)}
                          />
                        }
                        label={subject.label}
                      />
                    ))}
                  </FormGroup>
                  {errors.subjects && (
                    <Alert severity="error" sx={{ mt: 1, py: 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Error sx={{ fontSize: 16 }} />
                        {errors.subjects}
                      </Box>
                    </Alert>
                  )}
                </FormControl>

                {/* MOS Version */}
                <FormControl component="fieldset" sx={{ mb: 3 }} error={!!errors.version}>
                  <FormLabel component="legend" sx={{ fontWeight: 500, mb: 1 }}>
                    Phiên bản MOS *
                  </FormLabel>
                  <RadioGroup
                    row
                    value={formData.version}
                    onChange={(e) => handleInputChange("version", e.target.value)}
                  >
                    {["2016", "2019", "365"].map((version) => (
                      <FormControlLabel key={version} value={version} control={<Radio />} label={version} />
                    ))}
                  </RadioGroup>
                  {errors.version && (
                    <Alert severity="error" sx={{ mt: 1, py: 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Error sx={{ fontSize: 16 }} />
                        {errors.version}
                      </Box>
                    </Alert>
                  )}
                </FormControl>

                {/* Language */}
                <FormControl component="fieldset" sx={{ mb: 3 }} error={!!errors.language}>
                  <FormLabel
                    component="legend"
                    sx={{ fontWeight: 500, mb: 1, display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Language sx={{ fontSize: 16 }} />
                    Ngôn ngữ thi *
                  </FormLabel>
                  <RadioGroup
                    row
                    value={formData.language}
                    onChange={(e) => handleInputChange("language", e.target.value)}
                  >
                    <FormControlLabel value="TA" control={<Radio />} label="Tiếng Anh" />
                    <FormControlLabel value="TV" control={<Radio />} label="Tiếng Việt" />
                  </RadioGroup>
                  {errors.language && (
                    <Alert severity="error" sx={{ mt: 1, py: 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Error sx={{ fontSize: 16 }} />
                        {errors.language}
                      </Box>
                    </Alert>
                  )}
                </FormControl>

                {/* Test Area */}
                <FormControl component="fieldset" sx={{ mb: 3 }} error={!!errors.area}>
                  <FormLabel
                    component="legend"
                    sx={{ fontWeight: 500, mb: 1, display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <LocationOn sx={{ fontSize: 16 }} />
                    Khu vực thi *
                  </FormLabel>
                  <RadioGroup value={formData.area} onChange={(e) => handleInputChange("area", e.target.value)}>
                    {["Hà Nội", "Hồ Chí Minh", "Đà Nẵng"].map((area) => (
                      <FormControlLabel key={area} value={area} control={<Radio />} label={area} />
                    ))}
                  </RadioGroup>
                  {errors.area && (
                    <Alert severity="error" sx={{ mt: 1, py: 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Error sx={{ fontSize: 16 }} />
                        {errors.area}
                      </Box>
                    </Alert>
                  )}
                </FormControl>
              </Box>

              {/* Submit Button */}
              <Box sx={{ pt: 3 }}>
                <GradientButton
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi đăng ký"}
                </GradientButton>
              </Box>
            </Box>
          </CardContent>
        </GradientCard>
      </Container>
    </Box>
  )
}
