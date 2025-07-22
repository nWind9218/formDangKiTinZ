
import { useEffect, useState } from "react"
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
  MenuItem,
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
  Man4Outlined,
} from "@mui/icons-material"
import axios from "axios"
import { generateUnique12DigitCode } from "./Banking"
import { useNavigate } from "react-router-dom"
import { GridDeleteIcon } from "@mui/x-data-grid"

const GradientCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[10],
}))

const GradientCardHeader = styled(CardHeader)(({ theme }) => ({
  background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
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
  background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
  color: "white",
  fontWeight: 600,
  padding: "12px 0",
  borderRadius: "8px",
  boxShadow: theme.shadows[4],
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
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
    location: "",
    gvHD:"",
    address:'',
    exams : [
      {subject: "", version: "", language: "", slot:""}
    ]
  })
  const [rows, setRow] = useState([])
  const lastLocation = formData.exams.at(-1)?.location;
  
    const location = formData.location;
    useEffect(() => {
    if (location) {
      const fetchData = async () => {
        let link = '';
        let data = null;

        if (location === "Hà Nội") {
          link = "http://localhost:5000/hanoi";
        } else if (location === "Thành phố Hồ Chí Minh") {
          link = "http://localhost:5000/tphcm";
        } else {
          link = "http://localhost:5000/danang";
        }
        try {
          const response = await axios.get(link);
          data = response.data;
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu: ", error);
        }

        let id = 0;
        const responseData = data?.map((item) => ({
          ca_thi: (item.ca_thi== null?'': item.ca_thi + ' ') + (item.buoi==null?"":item.buoi+'(') + `${item.gio_thi == null?"":item.gio_thi+ ' '}${item.ngay_thi == null? '': item.ngay_thi+ ')'}` + (item.dia_diem==null? '': ', '+item.dia_diem ) + ` (Slot: ${item.slot})`,
          ca_thi_id: id++,
        })) || []

        setRow(responseData);
      };

      fetchData();
    }
  }, [location]);

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const handleExamChange = (index, field, value) => {
    const updatedExams = [...formData.exams]
    updatedExams[index][field] = value
    setFormData((prev) => ({ ...prev, exams: updatedExams }))
  }
  const handleAddExamRow = () => {
    setFormData((prev) => ({
      ...prev,
      exams: [...prev.exams, { subject: "", version: "", language: "", slot: "" , location: lastLocation}],
    }))
  }
  const handleDeleteExamRow = () => {   
    if (formData.exams.length <= 1) return; // Không xoá nếu chỉ còn 1 môn

    setFormData((prevData) => ({
      ...prevData,
      exams: prevData.exams.slice(0, -1), // Xoá phần tử cuối
    }));
  }
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
    if (!formData.gvHD) newErrors.gvHD = "Vui lòng chọn giáo viên hướng dẫn"
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
      newErrors.birthYear = "Năm sinh không hợp lệ"
    }
    if ( formData.idNumber &&!/^0\d{11}$/.test(formData.idNumber)) {
      newErrors.idNumber = "Số CCCD của bạn không hợp lệ"
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
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
        formData.idNumber = formData.idNumber.trim()
        const psid = generateUnique12DigitCode()
        const response = await axios.post("http://localhost:5000/api_register", {
          data : formData,
          psid : psid
        })
        console.log("Thông báo từ server: ", response.data.message)
        console.log("Kết quả nhận về là: ", response.data.isTinZStudent)
        /**
         * FOR BANKING PURPOSE, SỬ DỤNG LOCAL STORAGE LƯU LẠI THÔNG TIN => Không được
         * QUERY STRING
         */
        const queryParams = new URLSearchParams({
          content: psid,
          TinZstudent: response.data.isTinZStudent,
          amount: formData.exams.length
        }).toString()
        navigate(`/banking?${queryParams}`)
        setIsSubmitted(true)
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error)
      } finally {
        setIsSubmitting(false)
      }
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
        location: "",
        gvHD:"",
        address:'',
        exams : [
          {subject: "", version: "", language: "", slot:""}
        ]
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
  const canAddExamRow = (exam) => {
  return (
    exam.subject?.trim() &&
    exam.version?.trim() &&
    exam.language?.trim() &&
    formData.location?.trim() &&
    exam.slot?.trim() &&
    formData.exams.length <3
  )
}
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #f3e8ff 100%)",
        p: 2
      }}
    >
      <Container maxWidth="xl">
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
                  <Person sx={{ color: "#059669" }} />
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
                    <FormControlLabel value="Không xác định" control={<Radio />} label="Không xác định" />
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
                {/* Address */}
                <TextField
                  fullWidth
                  label="Địa chỉ hiện tại của bạn"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  sx={{ mb: 3 }}
                  placeholder="Nhập địa chỉ hiện tại của bạn"
                />
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Contact Information */}
              <Box sx={{ mb: 4 }}>
                <SectionTitle>
                  <Email sx={{  color: "#059669" }} />
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
                <TextField
                  fullWidth
                  select
                  label="Bạn đăng ký dưới sự hướng dẫn của? *"
                  value={formData.gvHD}
                  onChange={(e) => handleInputChange("gvHD", e.target.value)}
                  error={!!errors.gvHD}
                  sx={{ mb: 3 }}
                  placeholder="Chọn giáo viên hướng dẫn bạn đăng ký"
                  InputProps={{
                    startAdornment: <Man4Outlined sx={{ color: "#6b7280", mr: 1 }} />,
                  }}
                >
                  {['GV Lê Minh Ngọc', 'GV Trần Thị Lâm', 'GV Lương Anh Tú', 'Đăng kí qua Fanpage TinZ'].map((gv) => (
                        <MenuItem key={gv} value={gv}>
                          {gv}
                        </MenuItem>
                      ))}
                </TextField>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Exam Information */}
                  
               <Box sx={{ mb: 4 }}>
                <SectionTitle>
                  <MenuBook sx={{ color: "#059669" }} />
                  Thông tin thi
                </SectionTitle>
                
                {formData.exams.map((exam, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                {/* Hàng riêng cho dropdown khu vực thi */}
                {index === 0 && (
                  <Grid container sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        select
                        fullWidth
                        label="Khu vực thi"
                        value={formData.location}
                        onChange={(e) => {
                          handleInputChange("location", e.target.value)
                        }}
                        sx={{
                          '& .MuiInputBase-root': {
                            height: 55, width: 300
                          },
                        }}
                      >
                        {["Hà Nội", "Đà Nẵng", "Thành phố Hồ Chí Minh"].map((city) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                )}


                {/* Hàng chứa 4 dropdown: môn thi, phiên bản, ngôn ngữ, ca thi */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      select
                      disabled = {!formData.location}
                      fullWidth
                      label="Môn thi"
                      value={exam.subject}
                      sx={{
                          '& .MuiInputBase-root': {
                            height: 55, width: 140
                          },
                        }}
                        onClick={() => {
                        if (!formData.location) {
                          alert('Bạn chọn địa điểm thi trước!')
                        }
                      }}
                      onChange={(e) => {
                        handleExamChange(index, "subject", e.target.value)}
                      }
                    >
                      {["Word", "Excel", "PowerPoint"].map((subject) => (
                        <MenuItem key={subject} value={subject}>
                          {subject}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      select
                      fullWidth
                      onClick={() => {
                        if (!formData.location) {
                          alert('Bạn chọn địa điểm thi trước!')
                        }
                      }}
                      disabled = {!formData.location}
                      label="Phiên bản"
                      value={exam.version}
                      sx={{
                          '& .MuiInputBase-root': {
                            height: 55, width: 100
                          },
                        }}
                      onChange={(e) => {
                        handleExamChange(index, "version", e.target.value)}
                      }
                    >
                      {["2016", "2019", "365"].map((version) => (
                        <MenuItem key={version} value={version}>
                          {version}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      select
                      disabled = {!formData.location}
                      onClick={() => {
                        if (!formData.location) {
                          alert('Bạn chọn địa điểm thi trước!')
                        }
                      }}
                      fullWidth
                      label="Ngôn ngữ thi"
                      value={exam.language}
                      sx={{
                          '& .MuiInputBase-root': {
                            height: 55, width: 150
                          },
                        }}
                      onChange={(e) => {
                        handleExamChange(index, "language", e.target.value)}
                      }
                    >
                      {["Tiếng Anh", "Tiếng Việt"].map((lang) => (
                        <MenuItem key={lang} value={lang}>
                          {lang}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      select
                      disabled = {!formData.location}
                      fullWidth
                      onClick={() => {
                        if (!formData.location) {
                          alert('Bạn chọn địa điểm thi trước!')
                        }
                      }}
                      label="Ca thi"
                      value={exam.slot}
                      sx={{
                          '& .MuiInputBase-root': {
                            height: 55, width: 'auto',minWidth :140,
                          },
                        }}
                      onChange={(e) => {
                        handleExamChange(index, "slot", e.target.value)}
                      }
                    >
                      {rows.map((slot) => {
                        return (
                        <MenuItem key={slot.ca_thi_id} value={slot.ca_thi}>
                          {slot.ca_thi}
                        </MenuItem>
                      )})}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            ))}
                <Box sx={{ textAlign: "center", mt : 2 }}>
                  <Button 
                  variant="outlined" 
                  onClick={handleAddExamRow} 
                  disabled={!canAddExamRow(formData.exams.at(-1))}
                  sx={{
                    mx: 1,
                    color: "#10b981",               // chữ xanh lá
                    borderColor: "#10b981",         // viền xanh lá
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#ecfdf5",   // nền xanh lá nhạt khi hover
                      borderColor: "#059669",
                      color: "#059669",
                    },
                    "&.Mui-disabled": {
                      color: "#9ca3af",             // màu chữ xám khi disable
                      borderColor: "#d1d5db",
                    },
                  }}
                   >
                    + Thêm môn thi
                  </Button>
                  <Button 
                  variant="outlined"
                  onClick={handleDeleteExamRow}
                  disabled={formData.exams.length <= 1}
                  color="error"
                  sx={{mx: 1}}
                  startIcon={<GridDeleteIcon/>}
                   >
                    - Xóa môn thi
                  </Button>
                </Box>
              </Box>
              {/* Submit Button */}
              <Box sx={{ pt: 3 }}>
                <GradientButton
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  disableElevation
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
