import { useReducer, useState, useMemo, lazy, Suspense } from "react";
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
  InputLabel,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Tooltip,
  Divider,
  Autocomplete,
  Chip,
  Alert,
  Switch,
  Input,
} from "@mui/material";
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
import PageLayout from "../../../components/PageLayout";
import {
  companiesData,
  customerRolles,
  discounts,
  flags,
  formats,
  languages,
  modules,
} from "../../../constant/constant";

const ReactQuill = lazy(() => import("react-quill"));
import "react-quill/dist/quill.snow.css";
import { debounce } from "lodash";

const initialState = {
  languages: languages.reduce((acc, lang) => {
    acc[lang] = {
      name: "",
      description: "",
      searchEngineName: "",
      metaTitle: "",
      metaKeyWord: "",
      metaDescription: "",
    };
    return acc;
  }, {}),
  image: null,
  published: true,
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
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_LANGUAGE_FIELD":
      return {
        ...state,
        languages: {
          ...state.languages,
          [action.payload.lang]: {
            ...state.languages[action.payload.lang],
            [action.payload.field]: action.payload.value,
          },
        },
      };
    case "UPDATE_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };
    case "UPDATE_IMAGE":
      return { ...state, image: action.payload };
    default:
      return state;
  }
}

const BrandCreate = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [tabValue, setTabValue] = useState(0);
  const [seoTabValue, setSeoTabValue] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isDetail, setIsDetail] = useState(true);

  const handleInputChange = debounce((lang, field, value) => {
    dispatch({
      type: "UPDATE_LANGUAGE_FIELD",
      payload: { lang, field, value },
    });
  }, 500);

  const handleFieldChange = debounce((field, value) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { field, value },
    });
  }, 500);

  const handleChangeWithoutDebounce = (field, value) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { field, value },
    });
  };

  const imageUrl = useMemo(
    () => state.image && URL.createObjectURL(state.image),
    [state.image]
  );

  return (
    <PageLayout title={"YENİ MARKA EKLE"}>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 2,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div className="flex justify-between items-center gap-4 ">
          <FormControlLabel
            control={
              <Switch
                checked={isDetail}
                onChange={(e) => setIsDetail(e.target.checked)}
              />
            }
            label={"Detaylı"}
          />
          <div className="flex gap-4">
            <Button
              variant="contained"
              onClick={() => console.log("state", state)}
            >
              Kaydet
            </Button>
            <Button variant="contained" color="error">
              Kaydet ve Düzenlemeye Devam Et
            </Button>
          </div>
        </div>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <div className="flex gap-4 items-center">
              <Info fontSize="large" />
              <Typography variant="h6">Marka Bilgisi</Typography>
            </div>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <AppBar position="static" color="default">
              <Tabs
                value={tabValue}
                onChange={(_, newValue) => setTabValue(newValue)}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                {languages.map((lang) => (
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
                  />
                ))}
              </Tabs>
            </AppBar>

            {languages.map((lang, index) => (
              <Box
                key={lang}
                role="tabpanel"
                hidden={tabValue !== index}
                bgcolor={isDarkMode && "#595959"}
                sx={{ p: 3 }}
              >
                <TextField
                  label="Ad"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  required
                  defaultValue={state.languages[lang].name}
                  onChange={(e) =>
                    handleInputChange(lang, "name", e.target.value)
                  }
                />
                <InputLabel>Açıklama</InputLabel>
                <Suspense fallback={<div>Yükleniyor...</div>}>
                  <ReactQuill
                    value={state.languages[lang].description}
                    onChange={(value) =>
                      handleInputChange(lang, "description", value)
                    }
                    className={isDarkMode ? "quill-dark" : ""}
                    modules={modules}
                    formats={formats}
                  />
                </Suspense>
              </Box>
            ))}

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
                <Input
                  type="file"
                  accept="image/*"
                  sx={{ display: "none" }}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_IMAGE",
                      payload: e.target.files[0],
                    })
                  }
                />
              </Button>
              {state.image && (
                <div className="flex items-center gap-2">
                  <img
                    src={imageUrl}
                    alt="Yüklenen Resim"
                    className="h-16 object-cover rounded-md"
                  />
                  <Typography fontSize="14px">
                    {state.image.name} ({(state.image.size / 1024).toFixed(2)}{" "}
                    KB)
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() =>
                      dispatch({ type: "UPDATE_IMAGE", payload: null })
                    }
                  >
                    Sil
                  </Button>
                </div>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
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
                {isDetail && (
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
                          checked={state.published}
                          onChange={(e) =>
                            handleChangeWithoutDebounce(
                              "published",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Yayınlandı"
                    />
                  </div>
                )}
                {isDetail && (
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
                          checked={state.allowPageSizeSelection}
                          onChange={(e) =>
                            handleChangeWithoutDebounce(
                              "allowPageSizeSelection",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Müşterilerin sayfa boyutunu seçmesine izin ver"
                    />
                  </div>
                )}
                {isDetail && state.allowPageSizeSelection ? (
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
                      autoComplete="off"
                      value={state.pageSizeOptions}
                      onChange={(e) =>
                        handleChangeWithoutDebounce(
                          "pageSizeOptions",
                          e.target.value
                        )
                      }
                      className="w-1/2"
                    />
                  </div>
                ) : (
                  isDetail && (
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
                        autoComplete="off"
                        value={state.pageSize}
                        onChange={(e) =>
                          handleChangeWithoutDebounce(
                            "pageSize",
                            Number(e.target.value)
                          )
                        }
                        className="w-1/2"
                      />
                    </div>
                  )
                )}
                {isDetail && (
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
                          checked={state.enablePriceFilter}
                          onChange={(e) =>
                            handleChangeWithoutDebounce(
                              "enablePriceFilter",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Fiyat aralığı filtreleme"
                    />
                  </div>
                )}
                {isDetail && state.enablePriceFilter && (
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
                          checked={state.manualPriceEntry}
                          onChange={(e) =>
                            handleChangeWithoutDebounce(
                              "manualPriceEntry",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Fiyat aralığını elle girin"
                    />
                  </div>
                )}
                {isDetail &&
                  state.enablePriceFilter &&
                  state.manualPriceEntry && (
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
                          autoComplete="off"
                          defaultValue={state.startPrice}
                          onChange={(e) =>
                            handleFieldChange(
                              "startPrice",
                              Number(e.target.value)
                            )
                          }
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
                          autoComplete="off"
                          defaultValue={state.endPrice}
                          onChange={(e) =>
                            handleFieldChange(
                              "endPrice",
                              Number(e.target.value)
                            )
                          }
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
                    autoComplete="off"
                    defaultValue={state.displayOrder}
                    onChange={(e) =>
                      handleFieldChange("displayOrder", Number(e.target.value))
                    }
                  />
                </div>
              </FormGroup>
            </div>
          </AccordionDetails>
        </Accordion>
        {isDetail && (
          <Accordion>
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
                  freeSolo
                  id="discounts"
                  disableCloseOnSelect
                  value={state.discounts || null}
                  onChange={(e, newValue) =>
                    handleChangeWithoutDebounce("discounts", newValue)
                  }
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
                    freeSolo
                    id="customerRolles"
                    className="w-1/2"
                    disableCloseOnSelect
                    value={state.customerRolles || null}
                    onChange={(e, newValue) =>
                      handleChangeWithoutDebounce("customerRolles", newValue)
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
                      <TextField
                        {...params}
                        label="Müşteri rolleriyle sınırlı"
                      />
                    )}
                  />
                  <Alert variant="outlined" severity="info" className="w-1/2">
                    Bu işlevi kullanmak için aşağıdaki ayarı devre dışı
                    bırakmanız gerekir: Katalog ayarları ACL kurallarını yoksay.
                  </Alert>
                </div>
                <div className="flex gap-4">
                  <Autocomplete
                    multiple
                    freeSolo
                    id="companies"
                    className="w-1/2"
                    disableCloseOnSelect
                    value={state.companies || null}
                    onChange={(e, newValue) =>
                      handleChangeWithoutDebounce("companies", newValue)
                    }
                    size="small"
                    options={companiesData}
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
                    Bu işlevi kullanmak için aşağıdaki ayarı devre dışı
                    bırakmanız gerekir: Katalog ayarları "Mağaza başına sınır"
                    kurallarını göz ardı edin.
                  </Alert>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        )}
        {isDetail && (
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
                  value={seoTabValue}
                  onChange={(_, newValue) => setSeoTabValue(newValue)}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  {languages.map((lang) => (
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
                    />
                  ))}
                </Tabs>
              </AppBar>

              {languages.map((lang, index) => (
                <Box
                  key={lang}
                  role="tabpanel"
                  hidden={seoTabValue !== index}
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
                        autoComplete="off"
                        fullWidth
                        defaultValue={state.languages[lang].searchEngineName}
                        onChange={(e) =>
                          handleInputChange(
                            lang,
                            "searchEngineName",
                            e.target.value
                          )
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
                        autoComplete="off"
                        fullWidth
                        defaultValue={state.languages[lang].metaTitle}
                        onChange={(e) =>
                          handleInputChange(lang, "metaTitle", e.target.value)
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
                        autoComplete="off"
                        fullWidth
                        defaultValue={state.languages[lang].metaKeyWord}
                        onChange={(e) =>
                          handleInputChange(lang, "metaKeyWord", e.target.value)
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
                        autoComplete="off"
                        fullWidth
                        multiline
                        rows={2}
                        defaultValue={state.languages[lang].metaDescription}
                        onChange={(e) =>
                          handleInputChange(
                            lang,
                            "metaDescription",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        )}
        {isDetail && (
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
        )}
      </Box>
    </PageLayout>
  );
};

export default BrandCreate;
