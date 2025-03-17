import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Box,
  Tab,
  Tabs,
  TextField,
  Typography,
  SvgIcon,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  styled,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Tooltip,
  Chip,
  Divider,
  Autocomplete,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import {
  AddAPhoto,
  Bookmark,
  ExpandMore,
  Info,
  InfoOutlined,
  List,
  Monitor,
  SavedSearch,
} from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CatalogData } from "./CatalogData";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "align",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
];

const flags = {
  en: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
  tr: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",
  it: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
  ru: "https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const discounts = ["test1 kategori", "test2 kategori", "test3 kategori"];
const customerRolles = [
  "Administrators",
  "Forum Moderators",
  "Guests",
  "Registered",
  "Vendors",
];
const companies = [
  "Carus Company",
  "Forum Company",
  "Guests Company",
  "Registered Company",
  "Vendors Company",
];

const languages = ["standart", "en", "tr", "it", "ru"];

const CategoryCreate = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [tabValue, setTabValue] = useState(0);

  const [categoryFormState, setCategoryFormState] = React.useState({
    standart: {
      name: "",
      description: "",
      searchEngineName: "",
      metaTitle: "",
      metaKeyWord: "",
      metaDescription: "",
    },
    tr: {
      name: "",
      description: "",
      searchEngineName: "",
      metaTitle: "",
      metaKeyWord: "",
      metaDescription: "",
    },
    en: {
      name: "",
      description: "",
      searchEngineName: "",
      metaTitle: "",
      metaKeyWord: "",
      metaDescription: "",
    },
    it: {
      name: "",
      description: "",
      searchEngineName: "",
      metaTitle: "",
      metaKeyWord: "",
      metaDescription: "",
    },
    ru: {
      name: "",
      description: "",
      searchEngineName: "",
      metaTitle: "",
      metaKeyWord: "",
      metaDescription: "",
    },
    upperCategory: "",
    image: "",
    published: true,
    showOnHomepage: false,
    includeInMenu: true,
    allowPageSizeSelection: true,
    pageSize: 10,
    pageSizeOptions: "6, 3, 9",
    enablePriceFilter: true,
    manualPriceEntry: true,
    startPrice: 0,
    endPrice: 10000.0,
    displayOrder: 0,
    discounts: [],
    customerRolles: [],
    companies: [],
  });

  const handleCategoryChange = (event) => {
    setCategoryFormState((prevState) => ({
      ...prevState,
      upperCategory: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    setCategoryFormState((prevState) => ({
      ...prevState,
      image: event.target.files[0],
    }));
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCategoryFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDiscountChange = (newValue) => {
    setCategoryFormState((prevState) => ({
      ...prevState,
      discounts: newValue,
    }));
  };

  const handleCustomerRoleChange = (newValue) => {
    setCategoryFormState((prevState) => ({
      ...prevState,
      customerRolles: newValue,
    }));
  };

  const handleCompanyChange = (newValue) => {
    setCategoryFormState((prevState) => ({
      ...prevState,
      companies: newValue,
    }));
  };

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        position: "relative",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <div className="flex gap-4 items-center">
            <Info fontSize="large" />
            <Typography variant="h6">Kategori Bilgisi</Typography>
          </div>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <AppBar position="static" color="default">
            <Tabs
              value={tabValue}
              sx={{ minHeight: 50 }}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              {languages.map((lang, index) => (
                <Tab
                  key={lang}
                  label={lang.toUpperCase()}
                  sx={{ minHeight: 50, fontSize: 14 }}
                  iconPosition="start"
                  icon={
                    lang !== "standart" ? (
                      <SvgIcon>
                        <image href={flags[lang]} width="24" height="24" />
                      </SvgIcon>
                    ) : null
                  }
                  {...{
                    id: `tab-${index}`,
                    "aria-controls": `tabpanel-${index}`,
                  }}
                />
              ))}
            </Tabs>
          </AppBar>

          {languages.map((lang, index) => (
            <Box
              key={lang}
              role="tabpanel"
              hidden={tabValue !== index}
              sx={{ p: 3 }}
              bgcolor={isDarkMode && "#595959"}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Tooltip arrow title="Kategorinin adı.">
                    <InfoOutlined color="primary" />
                  </Tooltip>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Ad"
                    required
                    fullWidth
                    value={categoryFormState[lang].name}
                    onChange={(e) =>
                      setCategoryFormState((prev) => ({
                        ...prev,
                        [lang]: { ...prev[lang], name: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Tooltip arrow title="Kategorinin açıklaması.">
                      <InfoOutlined color="primary" />
                    </Tooltip>
                    <InputLabel>Açıklama</InputLabel>
                  </div>
                  <ReactQuill
                    value={categoryFormState[lang].description}
                    onChange={(value) =>
                      setCategoryFormState((prev) => ({
                        ...prev,
                        [lang]: { ...prev[lang], description: value },
                      }))
                    }
                    modules={modules}
                    formats={formats}
                    className={isDarkMode ? "quill-dark" : ""}
                  />
                </div>
              </div>
            </Box>
          ))}
          <div className="flex flex-col gap-2 p-6">
            <FormControl fullWidth>
              <InputLabel size="small" id="demo-simple-select-label">
                Üst Kategori
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryFormState.upperCategory}
                onChange={handleCategoryChange}
                size="small"
                label="Üst Kategori"
              >
                {CatalogData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.Breadcrumb}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className="flex items-center gap-2 mt-3 border p-2 rounded-md">
              <Typography fontSize="14px" fontWeight="bold">
                Resim:
              </Typography>
              <Button
                component="label"
                variant="contained"
                startIcon={<AddAPhoto />}
              >
                Dosya Seç
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {categoryFormState.image && (
                <div className="flex items-center gap-2">
                  <img
                    src={URL.createObjectURL(categoryFormState.image)}
                    alt="Yüklenen Resim"
                    className="h-16 object-cover rounded-md"
                  />
                  <Typography fontSize="14px">
                    {categoryFormState.image.name} (
                    {(categoryFormState.image.size / 1024).toFixed(2)} KB)
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() =>
                      setCategoryFormState((prev) => ({ ...prev, image: null }))
                    }
                  >
                    Sil
                  </Button>
                </div>
              )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <div className="flex gap-4 items-center">
            <Monitor fontSize="large" />
            <Typography variant="h6">Görüntüle</Typography>
          </div>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <div className="flex flex-col">
            <FormGroup className=" space-y-4">
              <div className="flex items-center gap-2">
                <Tooltip
                  arrow
                  title="Bu kategoriyi yayınlamak için işaretleyin (mağazada görünür). Yayından kaldırmak için işareti kaldırın (kategori mağazada mevcut değil)."
                >
                  <InfoOutlined color="primary" />
                </Tooltip>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={categoryFormState.published}
                      onChange={handleInputChange}
                      name="published"
                    />
                  }
                  label="Yayınlandı"
                />
              </div>
              <div className="flex items-center gap-2">
                <Tooltip
                  arrow
                  title="Ana sayfada bir kategori göstermek istiyorsanız işaretleyin."
                >
                  <InfoOutlined color="primary" />
                </Tooltip>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={categoryFormState.showOnHomepage}
                      onChange={handleInputChange}
                      name="showOnHomepage"
                    />
                  }
                  label="Ana sayfada göster"
                />
              </div>
              <div className="flex items-center gap-2">
                <Tooltip
                  arrow
                  title="Üst menü çubuğunda görüntüleyin. Bu kategori bir alt kategoriyse, üst kategorisinde de bu özelliğin etkinleştirildiğinden emin olun."
                >
                  <InfoOutlined color="primary" />
                </Tooltip>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={categoryFormState.includeInMenu}
                      onChange={handleInputChange}
                      name="includeInMenu"
                    />
                  }
                  label="Üst menüye dahil et"
                />
              </div>
              <div className="flex items-center gap-2">
                <Tooltip
                  arrow
                  title="Müşterilerin önceden tanımlanmış bir seçenekler listesinden sayfa boyutunu seçmesine izin verilip verilmeyeceği."
                >
                  <InfoOutlined color="primary" />
                </Tooltip>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={categoryFormState.allowPageSizeSelection}
                      onChange={handleInputChange}
                      name="allowPageSizeSelection"
                    />
                  }
                  label="Müşterilerin sayfa boyutunu seçmesine izin ver"
                />
              </div>
              {categoryFormState.allowPageSizeSelection ? (
                <div className="flex items-center gap-2">
                  <Tooltip
                    arrow
                    title="Sayfa boyutu seçeneklerinin virgülle ayrılmış listesi (ör. 10, 5, 15, 20). Hiçbiri seçilmemişse, ilk seçenek varsayılan sayfa boyutudur."
                  >
                    <InfoOutlined color="primary" />
                  </Tooltip>
                  <TextField
                    label="Sayfa Boyutu Seçenekleri"
                    type="string"
                    size="small"
                    name="pageSizeOptions"
                    value={categoryFormState.pageSizeOptions}
                    onChange={handleInputChange}
                    className="w-1/2"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Tooltip
                    arrow
                    title="Bu kategorideki ürünler için sayfa boyutunu ayarlayın, ör. Sayfa başına '4' ürün."
                  >
                    <InfoOutlined color="primary" />
                  </Tooltip>
                  <TextField
                    label="Sayfa Boyutu"
                    type="number"
                    size="small"
                    name="pageSize"
                    value={categoryFormState.pageSize}
                    onChange={handleInputChange}
                    className="w-1/2"
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <Tooltip
                  arrow
                  title="Fiyat aralığı filtrelemeyi etkinleştirmek için işaretleyin."
                >
                  <InfoOutlined color="primary" />
                </Tooltip>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={categoryFormState.enablePriceFilter}
                      onChange={handleInputChange}
                      name="enablePriceFilter"
                    />
                  }
                  label="Fiyat aralığı filtreleme"
                />
              </div>
              {categoryFormState.enablePriceFilter && (
                <div className="flex items-center gap-2">
                  <Tooltip
                    arrow
                    title="Fiyat aralığını elle girmek için işaretleyin, aksi takdirde otomatik fiyat aralığı hesaplaması etkinleştirilir (mevcut ürünlerin fiyatlarına göre). Karmaşık indirim kurallarınız varsa fiyat aralığını elle ayarlayın."
                  >
                    <InfoOutlined color="primary" />
                  </Tooltip>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categoryFormState.manualPriceEntry}
                        onChange={handleInputChange}
                        name="manualPriceEntry"
                      />
                    }
                    label="Fiyat aralığını elle girin"
                  />
                </div>
              )}
              {categoryFormState.manualPriceEntry && (
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Tooltip arrow title="Başlangıç fiyatını girin.">
                      <InfoOutlined color="primary" />
                    </Tooltip>
                    <TextField
                      label="Başlangıç Fiyatı (USD)"
                      type="number"
                      size="small"
                      name="startPrice"
                      value={categoryFormState.startPrice}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Tooltip arrow title="Bitiş fiyatını girin.">
                      <InfoOutlined color="primary" />
                    </Tooltip>
                    <TextField
                      label="Bitiş Fiyatı (USD)"
                      type="number"
                      size="small"
                      name="endPrice"
                      value={categoryFormState.endPrice}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Tooltip
                  arrow
                  title="Kategori görüntüleme sırasını ayarlayın. 1, listenin en üstünü temsil eder."
                >
                  <InfoOutlined color="primary" />
                </Tooltip>
                <TextField
                  label="Görüntüleme Sırası"
                  type="number"
                  size="small"
                  name="displayOrder"
                  value={categoryFormState.displayOrder}
                  onChange={handleInputChange}
                  className="w-1/2"
                />
              </div>
            </FormGroup>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex gap-4 items-center">
            <List fontSize="large" />
            <Typography variant="h6">Eşlemeler</Typography>
          </div>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <div className="flex flex-col mt-2 gap-4">
            <Autocomplete
              multiple
              id="discounts"
              disableCloseOnSelect
              value={categoryFormState.discounts}
              onChange={(event, newValue) => handleDiscountChange(newValue)}
              size="small"
              options={discounts}
              getOptionLabel={(option) => option}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return <Chip key={key} label={option} {...tagProps} />;
                })
              }
              renderInput={(params) => (
                <TextField {...params} label="İndirimler" />
              )}
            />
            <div className="flex gap-4">
              <Autocomplete
                multiple
                id="customerRolles"
                className="w-1/2"
                disableCloseOnSelect
                value={categoryFormState.customerRolles}
                onChange={(event, newValue) =>
                  handleCustomerRoleChange(newValue)
                }
                size="small"
                options={customerRolles}
                getOptionLabel={(option) => option}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return <Chip key={key} label={option} {...tagProps} />;
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Müşteri rolleriyle sınırlı" />
                )}
              />
              <Alert variant="outlined" severity="info" className="w-1/2">
                Bu işlevi kullanmak için aşağıdaki ayarı devre dışı bırakmanız
                gerekir: Katalog ayarları ACL kurallarını yoksay.
              </Alert>
            </div>
            <div className="flex gap-4">
              <Autocomplete
                multiple
                id="companies"
                className="w-1/2"
                disableCloseOnSelect
                value={categoryFormState.companies}
                onChange={(event, newValue) => handleCompanyChange(newValue)}
                size="small"
                options={companies}
                getOptionLabel={(option) => option}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return <Chip key={key} label={option} {...tagProps} />;
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Mağazalarla sınırlı" />
                )}
              />
              <Alert variant="outlined" severity="info" className="w-1/2">
                Bu işlevi kullanmak için aşağıdaki ayarı devre dışı bırakmanız
                gerekir: Katalog ayarları "Mağaza başına sınır" kurallarını göz
                ardı edin.
              </Alert>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex gap-4 items-center">
            <SavedSearch fontSize="large" />
            <Typography variant="h6">SEO</Typography>
          </div>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <AppBar position="static" color="default">
            <Tabs
              value={tabValue}
              sx={{ minHeight: 50 }}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              {languages.map((lang, index) => (
                <Tab
                  key={lang}
                  label={lang.toUpperCase()}
                  sx={{ minHeight: 50, fontSize: 14 }}
                  iconPosition="start"
                  icon={
                    lang !== "standart" ? (
                      <SvgIcon>
                        <image href={flags[lang]} width="24" height="24" />
                      </SvgIcon>
                    ) : null
                  }
                  {...{
                    id: `tab-${index}`,
                    "aria-controls": `tabpanel-${index}`,
                  }}
                />
              ))}
            </Tabs>
          </AppBar>

          {languages.map((lang, index) => (
            <Box
              key={lang}
              role="tabpanel"
              hidden={tabValue !== index}
              sx={{ p: 3 }}
              bgcolor={isDarkMode && "#595959"}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Tooltip
                    arrow
                    title="Arama motoru dostu sayfa adı girin, ör. Sayfa URL'nizi 'en-iyi-kategori yapmak için ''http://www.seninMagazan.com.tr/en-iyi-kategori'. Kategori adına göre otomatik olarak oluşturmak için boş bırakın."
                  >
                    <InfoOutlined color="primary" />
                  </Tooltip>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Arama motoru dostu sayfa adı"
                    required
                    fullWidth
                    value={categoryFormState[lang].searchEngineName}
                    onChange={(e) =>
                      setCategoryFormState((prev) => ({
                        ...prev,
                        [lang]: {
                          ...prev[lang],
                          searchEngineName: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip
                    arrow
                    title="Sayfa başlığını geçersiz kıl. Varsayılan, kategorinin adıdır."
                  >
                    <InfoOutlined color="primary" />
                  </Tooltip>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Meta başlığı"
                    required
                    fullWidth
                    value={categoryFormState[lang].metaTitle}
                    onChange={(e) =>
                      setCategoryFormState((prev) => ({
                        ...prev,
                        [lang]: { ...prev[lang], metaTitle: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip
                    arrow
                    title="Kategori sayfası başlığına eklenecek meta anahtar kelimeler."
                  >
                    <InfoOutlined color="primary" />
                  </Tooltip>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Meta anahtar kelimeleri"
                    required
                    fullWidth
                    value={categoryFormState[lang].metaKeyWord}
                    onChange={(e) =>
                      setCategoryFormState((prev) => ({
                        ...prev,
                        [lang]: { ...prev[lang], metaKeyWord: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip
                    arrow
                    title="Kategori sayfası başlığına eklenecek meta açıklaması."
                  >
                    <InfoOutlined color="primary" />
                  </Tooltip>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Meta açıklaması"
                    required
                    fullWidth
                    multiline
                    rows={2}
                    value={categoryFormState[lang].metaDescription}
                    onChange={(e) =>
                      setCategoryFormState((prev) => ({
                        ...prev,
                        [lang]: {
                          ...prev[lang],
                          metaDescription: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex gap-4 items-center">
            <Bookmark fontSize="large" />
            <Typography variant="h6">Ürünler</Typography>
          </div>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Typography>
            Bu kategori sayfasına ürün eklemeden önce kategoriyi kaydetmeniz
            gerekir.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CategoryCreate;
