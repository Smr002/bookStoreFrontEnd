import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, InputBase, MenuItem, Select, Badge, Divider, Popover, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { AccountCircle, FavoriteBorder, ShoppingCart, Search, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CardShop from './CardShop';
import { getAllAddCards, getAllBooks } from '../api';

const Header = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState(["See All"]);
  const [cardCount, setCardCount] = useState(0);
  const [error, setError] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchCategoriesAndCardCount = async () => {
      try {
        const books = await getAllBooks();
        const subjects = books.map((book) => book.subject).filter(Boolean);
        const uniqueSubjects = [...new Set(subjects)];
        setCategories(["See All", ...uniqueSubjects]);

        const cards = await getAllAddCards();
        setCardCount(cards.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch categories or card count");
      }
    };

    fetchCategoriesAndCardCount();
  }, []);

  const handleCartClick = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  const isCartOpen = Boolean(cartAnchorEl);

  const handleCategoryClick = (category) => {
    onCategorySelect(category); 
    if (category.toLowerCase().trim() === 'see all') {
      window.location.assign(`/book/allcategoriespage`);
    } else {
      window.location.assign(`/book/categorie/${encodeURIComponent(category)}`);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box>
      {/* Top Toolbar for Links (Hidden on Small Screens) */}
      <AppBar position="static" color="primary" sx={{ backgroundColor: '#35475e', padding: '0.5rem 1rem', display: { xs: 'none', md: 'flex' } }}>
        <Toolbar sx={{ justifyContent: 'center', gap: 3 }}>
          {["STORES & EVENTS", "MEMBERSHIP", "B&N READS BLOG", "PODCAST", "SWEEPSTAKES", "GIFT CARDS"].map((item, index) => (
            <Typography key={index} variant="body2" color="inherit" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              {item}
            </Typography>
          ))}
        </Toolbar>
      </AppBar>

      <Divider />

      {/* Main Toolbar with Logo and Search */}
      <AppBar position="relative" color="default" elevation={0} sx={{ backgroundColor: '#fff', paddingY: { xs: '0.5rem', sm: '1rem' } }}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Hamburger Menu for Mobile */}
          <IconButton
            color="default"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>

          {/* Logo */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', cursor: 'pointer', flex: { xs: 1, sm: 'none' }, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            BOOKSTORE
          </Typography>

          {/* Search Bar */}
          <Box sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            width: { xs: '100%', sm: '60%', md: '50%' },
            maxWidth: '600px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            <Select
              defaultValue="All"
              variant="standard"
              disableUnderline
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '0 8px',
                borderRight: '1px solid #ddd',
                minWidth: '60px',
                color: 'black'
              }}
            >
              <MenuItem value="All">All</MenuItem>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <InputBase
              placeholder="Search by Title, Author, Keyword or ISBN"
              sx={{
                flex: 1,
                padding: '8px 12px',
                fontSize: '0.9rem'
              }}
            />
            <IconButton type="submit" sx={{ padding: '8px', color: '#35475e' }}>
              <Search />
            </IconButton>
          </Box>

          {/* Icons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              color="default"
              component={Link}
              to="/signin"
              sx={{
                color: '#333',
                '&:hover': { color: '#35475e' },
                fontSize: { xs: 'small', sm: 'default' }
              }}
            >
              <AccountCircle fontSize="large" />
            </IconButton>

            <IconButton color="default" component={Link} to="#" sx={{ color: '#333', '&:hover': { color: '#35475e' } }}>
              <FavoriteBorder fontSize="large" />
            </IconButton>

            <IconButton
              color="default"
              sx={{
                color: '#333',
                '&:hover': { color: '#35475e' }
              }}
              onClick={handleCartClick}
            >
              <Badge badgeContent={cardCount} color="secondary">
                <ShoppingCart fontSize="large" />
              </Badge>
            </IconButton>

            <Popover
              open={isCartOpen}
              anchorEl={cartAnchorEl}
              onClose={handleCartClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <CardShop />
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>

      <Divider />

      {/* Drawer for Categories */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {categories.map((category, index) => (
              <ListItem button key={index} onClick={() => handleCategoryClick(category)}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Categories Toolbar for Larger Screens */}
      <Box sx={{
        display: { xs: 'none', sm: 'flex' },
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: '#fff',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd'
      }}>
        {categories.map((category, index) => (
          <Typography 
            key={index} 
            variant="body2" 
            sx={{ 
              marginX: 2, 
              color: '#333', 
              fontWeight: '500', 
              cursor: 'pointer', 
              '&:hover': { color: '#35475e', textDecoration: 'underline' } 
            }} 
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Header;
